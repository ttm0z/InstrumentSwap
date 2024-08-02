from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework import viewsets, generics
from rest_framework import status
from django.views.decorators.http import require_GET
from rest_framework.response import Response
import uuid
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, ListingSerializer, TransactionSerializer, MessageSerializer, SearchHistorySerializer, AppraisalSerializer, RegisterSerializer, ImageUploadSerializer
from .models import Listing, Transaction, Message, SearchHistory, Appraisal
from .models import User
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, ValidationError
import json
from .serializers import UserSerializer


class ImageUploadView(APIView):
    
    
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
                
        data = request.data.copy()
        files = request.FILES
        
        print("Data:" ,data )
        print("Files:", files)

        image_files = {key: files[key] for key in files}

        print(data.get('type'))
        print()
        print(image_files)
        print()
        

        #generate object to send to serializer

        #generate url
        serializer = ImageUploadSerializer(data = image_files)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def get_image_url(request, filename):
    url = settings.MEDIA_URL + filename
    return JsonResponse({'url': url})

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        
        data = json.loads(request.body)
        
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        print("username: ", username)
        print("password: ", password)
        print("email: ", email)
        if not username or not password or not email:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        try:
            print("Creating auth user")
            User = get_user_model()
            user = User(username=username)
            user.set_password(password)
            user.save()
            print("Auth user created")
            
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message':'Logged out successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def check_auth_view(request):
    if request.user.is_authenticated:
        return JsonResponse({'isAuthenticated':True, 'username': request.username}, status=200)
    else:
        return JsonResponse({'isAuthenticated':False}, status=200)
    

class LoginView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
    
        print("username:", username)
        print("password: ", password)
        
        user = authenticate(username=username, password=password)
        
        print("user", user)

        if user is not None:
            login(request, user)
            print("login:", login)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'status': 'success', 'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'], url_path='(?P<username>[^/.]+)')
    def get_by_username(self, request, username=None):
        try:
            user = User.objects.get(username=username)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            raise NotFound(detail="User not found")
    
    @action(detail=False, methods=['post'], url_path='(?P<username>[^/.]+)/update')
    def update_user(self, request, username=None):
        
        print(request.data)
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise NotFound(detail="User not found")
        
        serializer = self.get_serializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            raise ValidationError(serializer.errors)
        
    @action(detail=False, methods=['get'], url_path='username/(?P<username>[^/.]+)')
    def get_user_id_by_username(self, request, username=None):
        try:
            user = User.objects.get(username=username)
            return Response({'user_id' : user.user_id})
        except User.DoesNotExist:
            raise NotFound(detail="User not found")

class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    
    @action(detail=False, methods=['get'], url_path='getAll')
    def get_all(self, request, *args, **kwargs):
        listings = self.get_queryset()
        serializer = self.get_serializer(listings, many=True)
        return Response(serializer.data)
    
    
    @action(detail=False, methods=['get'], url_path='getById/(?P<id>[^/.]+)')
    def get_by_id(self, request, id=None, *args, **kwargs):
        try:
            listings = self.get_queryset().filter(user_id=id)
            if not listings.exists():
                return Response({"detail": "No listings found for this user ID."}, status=status.HTTP_404_NOT_FOUND)
        except Listing.DoesNotExist:
            return Response({"detail": "No listings found for this user ID."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.get_serializer(listings, many=True)
        return Response(serializer.data)



    @action(detail=False, methods=['post'], url_path='create_listing')
    def create_listing(self, request, *args, **kwargs):

        """
        Generate new urls for each of the images. 
        Send the images to the media folder with new names
        Send a JSON list of urls titled 'images'
        to the serializer along with the rest of the
        data
        input format: {user, title, description, category, condition, price, swap, location, status}
        """
        
        data = request.data.copy()
        files = request.FILES.getlist('images')
        
        image_urls = []
        
        user_id = data.get('user')
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_400_BAD_REQUEST)
        
        data['location'] = user.location

        for file in files:
            filename = f"{user_id}_listing_{uuid.uuid4()}{os.path.splitext(file.name)[1]}"
            relative_filepath = os.path.join('images', filename)  # Ensure it is saved in 'images/' subdirectory
            default_storage.save(relative_filepath, file)
            file_url = default_storage.url(relative_filepath)
            print("relative_filepath:", relative_filepath, "\n")
            print("file_url:", file_url, "\n")
            image_urls.append(filename)


        print("image urls: ", image_urls)

        # Convert image URLs to JSON format
        image_urls_json = json.dumps(image_urls)

        data['images'] = image_urls_json

        # Ensure price is a decimal and swap is a boolean
        data['price'] = float(data['price'])
        data['swap'] = data['swap'].lower() == 'true'

        serializer = ListingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Print the serializer errors for debugging
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'], url_path='getByCategory/(?P<category>[^/.]+)')
    def get_by_category(self, request, category=None, *args, **kwargs):
        listings = self.get_queryset().filter(category=category)
        serializer = self.get_serializer(listings, many=True)
        return Response(serializer.data)
    
class ListingDetailView(generics.RetrieveAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

    def get(self, request, *args, **kwargs):
        listing_id = kwargs.get('pk')
        try:
            listing = Listing.objects.get(pk=listing_id)
            serializer = self.get_serializer(listing)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Listing.DoesNotExist:
            return Response({'error': 'Listing not found'}, status=status.HTTP_404_NOT_FOUND)

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class SearchHistoryViewSet(viewsets.ModelViewSet):
    queryset = SearchHistory.objects.all()
    serializer_class = SearchHistorySerializer

class AppraisalViewSet(viewsets.ModelViewSet):
    queryset = Appraisal.objects.all()
    serializer_class = AppraisalSerializer
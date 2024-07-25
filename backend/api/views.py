from django.shortcuts import render
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model
from rest_framework import viewsets, generics
from rest_framework import status
from django.views.decorators.http import require_GET
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, ListingSerializer, TransactionSerializer, MessageSerializer, SearchHistorySerializer, AppraisalSerializer, RegisterSerializer
from .models import Listing, Transaction, Message, SearchHistory, Appraisal
from .models import ApiUser
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
import json

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
            user = User.objects.create_user(username=username, password=password, email=email)
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
    
        print(username)
        print(password)
        
        user = authenticate(username=username, password=password)
        
        print("user", user)

        if user is not None:
            login(request, user)
            print("login:", login)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'status': 'success', 'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


#listing views

@require_GET
def fetch_all_listings(request):
    try:
        listings = Listing.objects.all()
        listings_data = [listing.to_dict() for listing in listings]
        return JsonResponse(listings_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@require_GET
def fetch_listings_by_category(request, category):
    try:
        listings = Listing.objects.filter(category=category)
        listings_data = [listing.to_dict() for listing in listings]
        return JsonResponse(listings_data, safe=False)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    pass


# view sets
class UserViewSet(viewsets.ModelViewSet):
    queryset = ApiUser.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=['get'], url_path='by-username/(?P<username>[^/.]+)')
    def get_by_username(self, request, username=None):
        try:
            print("get")
            user = ApiUser.objects.get(username=username)
            print(user)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        except ApiUser.DoesNotExist:
            raise NotFound(detail="User not found")



class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    
    @action(detail=False, methods=['get'], url_path='getAll')
    def get_all(self, request, *args, **kwargs):
        listings = self.get_queryset()
        serializer = self.get_serializer(listings, many=True)
        return Response(serializer.data)

    
    @action(detail=False, methods=['get'], url_path='getByCategory/(?P<category>[^/.]+)')
    def get_by_category(self, request, category=None, *args, **kwargs):
        listings = self.get_queryset().filter(category=category)
        serializer = self.get_serializer(listings, many=True)
        return Response(serializer.data)

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
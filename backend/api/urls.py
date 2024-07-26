from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ListingViewSet, TransactionViewSet, MessageViewSet, SearchHistoryViewSet, AppraisalViewSet, LoginView, ImageUploadView
from .views import register_user, logout_view, check_auth_view
from .views import fetch_all_listings, fetch_listings_by_category, get_image_url

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'listings', ListingViewSet, basename='listings')
router.register(r'transactions', TransactionViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'search-history', SearchHistoryViewSet)
router.register(r'appraisals', AppraisalViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register_user'),
    path('logout/', logout_view, name='logout'),
    path('check-auth/', check_auth_view, name='check_auth'),
    path('login/', LoginView.as_view(), name='login'),
    path('upload/', ImageUploadView.as_view(), name='upload_image'),
    path('api/image/<str:filename>/', get_image_url, name='get_image_url'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
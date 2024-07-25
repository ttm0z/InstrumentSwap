from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ListingViewSet, TransactionViewSet, MessageViewSet, SearchHistoryViewSet, AppraisalViewSet, LoginView
from .views import register_user, logout_view, check_auth_view
from .views import fetch_all_listings, fetch_listings_by_category

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'listings', ListingViewSet, basename='listing')
router.register(r'transactions', TransactionViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'search-history', SearchHistoryViewSet)
router.register(r'appraisals', AppraisalViewSet),

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register_user, name='register_user'),
    path('logout/', logout_view, name='logout'),
    path('check-auth/', check_auth_view, name='check_auth'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/<str:username>', UserViewSet.as_view({'get':'get_by_username'}), name='get-user-by-username')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
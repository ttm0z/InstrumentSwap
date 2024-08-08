from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ListingViewSet, TransactionViewSet, MessageViewSet, SearchHistoryViewSet, AppraisalViewSet, AuthViewSet
from .views import search_view

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'listings', ListingViewSet, basename='listings')
router.register(r'transactions', TransactionViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'search-history', SearchHistoryViewSet)
router.register(r'appraisals', AppraisalViewSet)
router.register(r'auth', AuthViewSet, basename='auth')
router.register(r'conversations', UserViewSet, basename='conversations')

urlpatterns = [
    path('', include(router.urls)),
        path('search/', search_view, name='search'),  # Add this line
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
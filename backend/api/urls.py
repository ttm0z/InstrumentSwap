from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ListingViewSet, TransactionViewSet, MessageViewSet, SearchHistoryViewSet, AppraisalViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'listings', ListingViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'search-history', SearchHistoryViewSet)
router.register(r'appraisals', AppraisalViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
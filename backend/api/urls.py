from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ListingViewSet, TransactionViewSet, MessageViewSet, SearchHistoryViewSet, AppraisalViewSet, RegisterView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'listings', ListingViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'search-history', SearchHistoryViewSet)
router.register(r'appraisals', AppraisalViewSet),
router.register(r'login', UserViewSet),
router.register(r'register', RegisterView)

urlpatterns = [
    path('', include(router.urls)),
]
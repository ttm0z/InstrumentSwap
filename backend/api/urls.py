from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ListingViewSet, TransactionViewSet, MessageViewSet, SearchHistoryViewSet, AppraisalViewSet, RegisterView, LoginView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'listings', ListingViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'search-history', SearchHistoryViewSet)
router.register(r'appraisals', AppraisalViewSet),

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
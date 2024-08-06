from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
    path('ws/direct/<int:conversation_id>/', consumers.DirectMessageConsumer.as_asgi()),
]
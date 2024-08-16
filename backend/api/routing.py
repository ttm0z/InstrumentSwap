from django.urls import path
from . import consumers
from channels.routing import ProtocolTypeRouter, URLRouter

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', consumers.ChatConsumer.as_asgi()),
    path('ws/direct/<int:conversation_id>/', consumers.DirectMessageConsumer.as_asgi()),
    path('ws/test/', consumers.TestConsumer.as_asgi()),
]

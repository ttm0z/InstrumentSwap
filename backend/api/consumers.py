import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import User
from .models import Conversation, Message
from channels.auth import AuthMiddlewareStack


class DirectMessageConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.conversation_id = self.scope['url_route']['kwargs']['conversation_id']
        self.conversation_group_name = f'conversation_{self.conversation_id}'

        await self.channel_layer.group_add(
            self.conversation_group_name,
            self.channel_name
        )

        await self.accept()
        

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.conversation_group_name,
            self.channel_name
        )

    async def recieve(self, text_data):
        text_data_json = json.loads(text_data)
        message_content = text_data_json['message']
        sender_id = text_data_json['sender']

        await database_sync_to_async(self.save_message)(sender_id, message_content)
        

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']

        await self.send(text_data=json.dumps({
            'message' : message, 
            'sender': sender
        }))

    def save_message(self, sender_id, message_content):
        sender = User.objects.get(id=sender_id)
        conversation = Conversation.objects.get(id=self.conversation_id)
        Message.objects.create(conversation=conversation, sender=sender, content=message_content)


class ChatConsumer(AsyncWebsocketConsumer):
    
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer_group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def recieve(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
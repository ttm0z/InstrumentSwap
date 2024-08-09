# tests.py

from channels.layers import get_channel_layer
from channels.testing import WebsocketCommunicator
from django.test import TestCase
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from . import consumers
import asyncio
import json

class TestConsumerTestCase(TestCase):
    def setUp(self):
        self.channel_layer = get_channel_layer()
        self.communicator = WebsocketCommunicator(
            URLRouter([
                path('ws/test/', consumers.TestConsumer.as_asgi()),
            ]),
            'ws/test/'
        )

    async def test_message_echo(self):
        # Connect to the WebSocket
        connected, _ = await self.communicator.connect()
        self.assertTrue(connected)

        # Send a message
        await self.communicator.send_json_to({
            'message': 'Hello, World!'
        })

        # Receive the response
        response = await self.communicator.receive_json_from()
        self.assertEqual(response, {'message': 'Hello, World!'})

        # Disconnect
        await self.communicator.disconnect()

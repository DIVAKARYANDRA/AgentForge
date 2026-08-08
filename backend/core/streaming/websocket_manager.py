"""
WebSocket Connection Manager.
"""

from fastapi import WebSocket


class WebSocketManager:

    def __init__(self):

        self.connections = []

    async def connect(
        self,
        websocket: WebSocket
    ):

        await websocket.accept()

        self.connections.append(
            websocket
        )

    def disconnect(
        self,
        websocket
    ):

        if websocket in self.connections:

            self.connections.remove(
                websocket
            )

    async def broadcast(
        self,
        message
    ):

        for websocket in self.connections:

            await websocket.send_json(
                message
            )
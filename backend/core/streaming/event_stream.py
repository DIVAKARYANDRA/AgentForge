"""
Live Event Stream.
"""

import asyncio


class EventStream:

    def __init__(self):

        self.queue = asyncio.Queue()

    async def publish(
        self,
        event
    ):

        await self.queue.put(
            event
        )

    async def next_event(
        self
    ):

        return await self.queue.get()
"""
Stream Manager.
"""

from core.streaming import (
    EventStream
)


class StreamManager:

    def __init__(self):

        self.stream = EventStream()

    async def publish(
        self,
        event
    ):

        await self.stream.publish(
            event
        )

    async def next(
        self
    ):

        return await self.stream.next_event()
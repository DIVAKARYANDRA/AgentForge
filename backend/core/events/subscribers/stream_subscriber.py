"""
Stream Subscriber.

Publishes every event to the live stream.
"""


class StreamSubscriber:

    def __init__(
        self,
        stream_manager
    ):

        self.stream_manager = stream_manager


    async def handle(
        self,
        event
    ):

        await self.stream_manager.publish(

            {

                "event_type": event.event_type,

                "source": event.source,

                "payload": event.payload

            }

        )
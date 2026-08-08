"""
AgentForge Event Manager.
"""

from core.events import EventBus


class EventManager:

    def __init__(

        self

    ):

        self.bus = EventBus()


    def subscribe(

        self,

        event_type,

        handler

    ):

        self.bus.subscribe(

            event_type,

            handler

        )


    async def publish(

        self,

        event

    ):

        await self.bus.publish(

            event

        )

    @property
    def subscribers(

        self

    ):

        return self.bus.subscriber_count
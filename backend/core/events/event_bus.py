"""
AgentForge Event Bus.

Provides publish / subscribe
communication.
"""

from collections import defaultdict

from core.events import Event


class EventBus:

    def __init__(self):

        self._subscribers = defaultdict(
            list
        )


    def subscribe(

        self,

        event_type,

        handler

    ):

        self._subscribers[

            event_type

        ].append(

            handler

        )

    def unsubscribe(

        self,

        event_type,

        handler

    ):

        if event_type not in self._subscribers:

            return

        if handler in self._subscribers[event_type]:

            self._subscribers[event_type].remove(

                handler

            )

    async def publish(

        self,

        event: Event

    ):

        handlers = self._subscribers.get(

            event.event_type,

            []

        )

        for handler in handlers:

            await handler(

                event

            )


    async def publish_many(

        self,

        events

    ):

        for event in events:

            await self.publish(

                event

            )


    @property
    def subscriber_count(

        self

    ):

        return {

            key: len(value)

            for key, value

            in self._subscribers.items()

        }
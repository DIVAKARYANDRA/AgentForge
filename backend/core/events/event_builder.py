"""
Event Builder.
"""

import uuid

from core.events import (
    Event,
    EventType
)


class EventBuilder:

    def create(

        self,

        event_type: EventType,

        source: str,

        payload=None,

        metadata=None

    ):

        return Event(

            event_id=str(

                uuid.uuid4()

            ),

            event_type=event_type,

            source=source,

            payload=payload or {},

            metadata=metadata or {}

        )
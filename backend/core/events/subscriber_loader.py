"""
Registers built-in subscribers.
"""

from core.events.subscribers import (

    LoggingSubscriber,

    MemorySubscriber,

    AnalyticsSubscriber,

    WorkflowSubscriber

)

from core.events.subscribers import (
    StreamSubscriber
)


class SubscriberLoader:

    def __init__(

        self,

        memory=None,

        stream_manager=None

    ):

        self.logging = (

            LoggingSubscriber()

        )

        self.stream = StreamSubscriber(
            stream
        )

        self.memory = (

            MemorySubscriber(

                memory

            )

        )

        self.analytics = (

            AnalyticsSubscriber()

        )

        self.workflow = (

            WorkflowSubscriber()

        )

        self.stream = None

        if stream_manager:

            self.stream = StreamSubscriber(
                stream_manager
            )


    def register(

        self,

        event_manager

    ):

        from core.events import (

            EventType

        )

        for event in EventType:

            event_manager.subscribe(

                event,

                self.logging.handle

            )

            event_manager.subscribe(

                event,

                self.analytics.handle

            )

            event_manager.subscribe(

                event,

                self.workflow.handle

            )

            event_manager.subscribe(

                event,

                self.memory.handle

            )

            if self.stream:

                event_manager.subscribe(

                    event,

                    self.stream.handle

                )
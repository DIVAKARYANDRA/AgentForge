"""
Registers built-in subscribers.
"""

from core.events.subscribers import (

    LoggingSubscriber,

    MemorySubscriber,

    AnalyticsSubscriber,

    WorkflowSubscriber

)


class SubscriberLoader:

    def __init__(

        self,

        memory=None

    ):

        self.logging = (

            LoggingSubscriber()

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
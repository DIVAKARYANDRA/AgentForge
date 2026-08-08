"""
Logging Event Subscriber.
"""


class LoggingSubscriber:
    """
    Receives events and logs them.
    """

    async def handle(
        self,
        event
    ):

        print(

            "[EVENT]",

            event.event_type,

            "|",

            event.source,

            "|",

            event.payload

        )
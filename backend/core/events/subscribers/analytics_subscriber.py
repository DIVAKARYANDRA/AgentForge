"""
Analytics Event Subscriber.
"""


from collections import defaultdict


class AnalyticsSubscriber:

    def __init__(

        self

    ):

        self.metrics = defaultdict(

            int

        )


    async def handle(

        self,

        event

    ):

        self.metrics[

            event.event_type

        ] += 1

        source = event.source

        key = (

            f"{source}_events"

        )

        self.metrics[

            key

        ] += 1
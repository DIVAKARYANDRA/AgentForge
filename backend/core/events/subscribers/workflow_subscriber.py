"""
Workflow Event Subscriber.
"""


class WorkflowSubscriber:

    async def handle(

        self,

        event

    ):

        if "workflow" in event.source.lower():

            print(

                "[WORKFLOW]",

                event.event_type,

                event.payload

            )
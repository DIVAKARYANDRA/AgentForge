"""
Memory Event Subscriber.
"""


class MemorySubscriber:

    def __init__(
        self,
        memory_manager
    ):

        self.memory = memory_manager


    async def handle(
        self,
        event
    ):

        if self.memory is None:

            return


        history = await self.memory.retrieve(

            "SESSION",

            "event_history"

        )


        if history is None:

            history = []


        history.append(

            {

                "type":
                    event.event_type,

                "source":
                    event.source,

                "payload":
                    event.payload

            }

        )


        await self.memory.store(

            "SESSION",

            "event_history",

            history

        )
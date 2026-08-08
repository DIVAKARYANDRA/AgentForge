"""
AgentForge Memory Manager.

Central interface for all memory systems.
"""


from typing import Dict, Any


from core.memory import (
    MemoryType
)
from core.persistence import (
    PersistenceManager
)


class MemoryManager:
    """
    Manages multiple memory implementations.
    """



    def __init__(self):

        self.memories: Dict[
            MemoryType,
            Any
        ] = {}

        self.persistence = PersistenceManager()



    def register_memory(
        self,
        memory_type: MemoryType,
        memory_instance
    ):
        """
        Register a memory implementation.
        """

        self.memories[memory_type] = (
            memory_instance
        )



    def get_memory(
        self,
        memory_type: MemoryType
    ):
        """
        Retrieve memory instance.
        """

        memory = self.memories.get(
            memory_type
        )


        if memory is None:

            raise KeyError(

                f"Memory not registered: {memory_type}"

            )


        return memory



    async def store(
        self,
        memory_type: MemoryType,
        key: str,
        value
    ):
        """
        Store information.
        """

        memory = self.get_memory(
            memory_type
        )


        await memory.store(
            key,
            value
        )

        repository_key = (

            f"{memory_type.value}:{key}"

        )

        self.persistence.save(

            repository_key,

            value

        )



    async def retrieve(
        self,
        memory_type: MemoryType,
        key: str
    ):
        """
        Retrieve information.
        """

        memory = self.get_memory(
            memory_type
        )


        value = await memory.retrieve(
            key
        )

        if value is not None:

            return value

        repository_key = (

            f"{memory_type.value}:{key}"

        )

        return self.persistence.get(
            repository_key
        )



    async def clear(
        self,
        memory_type: MemoryType
    ):
        """
        Clear selected memory.
        """

        memory = self.get_memory(
            memory_type
        )


        await memory.clear()



    def available_memories(self):
        """
        List registered memories.
        """

        return [

            memory.value

            for memory in self.memories.keys()

        ]

    async def restore_session(
        self
    ):

        records = self.persistence.all()

        for key, value in records.items():

            if not key.startswith(

                "session:"

            ):

                continue

            session_key = key.replace(

                "session:",

                ""

            )

            session = self.memories.get(

                MemoryType.SESSION

            )

            if session:

                await session.store(

                    session_key,

                    value

                )

    async def restore_knowledge(
        self
    ):

        records = self.persistence.all()

        for key, value in records.items():

            if not key.startswith(

                "knowledge:"

            ):

                continue

            knowledge_key = key.replace(

                "knowledge:",

                ""

            )

            memory = self.memories.get(

                MemoryType.KNOWLEDGE

            )

            if memory:

                await memory.store(

                    knowledge_key,

                    value

                )

    async def restore(
        self
    ):

        await self.restore_session()

        await self.restore_knowledge()


    @property
    def persistence_status(
        self
    ):

        return {

            "records":

                len(

                    self.persistence.all()

                )

        }
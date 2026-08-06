"""
AgentForge Memory Manager.

Central interface for all memory systems.
"""


from typing import Dict, Any


from core.memory import (
    MemoryType
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


        return await memory.retrieve(
            key
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
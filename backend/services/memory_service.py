"""
AgentForge Memory Service.

Provides application-level access
to memory capabilities.
"""


from core.memory import (
    MemoryManager,
    MemoryType
)



class MemoryService:
    """
    High level memory operations.
    """



    def __init__(
        self,
        manager: MemoryManager
    ):

        self.manager = manager



    async def remember(
        self,
        key: str,
        value,
        memory_type: MemoryType
    ):

        await self.manager.store(

            memory_type,

            key,

            value

        )



    async def recall(
        self,
        key: str,
        memory_type: MemoryType
    ):

        return await self.manager.retrieve(

            memory_type,

            key

        )



    async def forget(
        self,
        key: str,
        memory_type: MemoryType
    ):

        memory = self.manager.get_memory(

            memory_type

        )


        await memory.delete(
            key
        )
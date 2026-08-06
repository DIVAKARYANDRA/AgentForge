import pytest


from core.memory import (
    MemoryManager,
    WorkingMemory,
    MemoryType
)



@pytest.mark.asyncio
async def test_memory_manager():


    manager = MemoryManager()


    working = WorkingMemory()


    manager.register_memory(

        MemoryType.WORKING,

        working

    )


    await manager.store(

        MemoryType.WORKING,

        "task",

        "Analyze file"

    )


    value = await manager.retrieve(

        MemoryType.WORKING,

        "task"

    )


    assert value == "Analyze file"
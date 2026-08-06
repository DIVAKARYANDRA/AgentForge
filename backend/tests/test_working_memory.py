import pytest


from core.memory import WorkingMemory



@pytest.mark.asyncio
async def test_working_memory():


    memory = WorkingMemory()


    await memory.store(
        "task",
        "Analyze document"
    )


    value = await memory.retrieve(
        "task"
    )


    assert value == "Analyze document"



    await memory.clear()


    value = await memory.retrieve(
        "task"
    )


    assert value is None
import pytest


from core.memory import LongTermMemory



@pytest.mark.asyncio
async def test_long_term_memory():


    memory = LongTermMemory()


    await memory.store(

        "preferred_language",

        "Python"

    )


    result = await memory.retrieve(

        "preferred_language"

    )


    assert result == "Python"
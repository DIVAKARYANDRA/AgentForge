import pytest


from core.memory import SessionMemory



@pytest.mark.asyncio
async def test_session_memory():


    memory = SessionMemory()



    await memory.store(

        "message",

        {
            "role":"user",
            "content":"Hello AgentForge"
        }

    )



    history = await memory.history()



    assert len(history) == 1


    assert history[0]["content"] == "Hello AgentForge"
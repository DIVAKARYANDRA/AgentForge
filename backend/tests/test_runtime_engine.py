import pytest


from core.runtime import (
    RuntimeEngine,
    AgentTask
)



@pytest.mark.asyncio
async def test_runtime_engine():


    runtime = RuntimeEngine()


    task = AgentTask(

        task_id="1",

        goal="Test execution"

    )


    result = await runtime.execute(
        task
    )


    assert result is not None
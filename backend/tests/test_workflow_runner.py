import pytest


from core.runtime import (
    TaskDispatcher,
    RuntimeTask,
    WorkflowRunner
)



@pytest.mark.asyncio
async def test_workflow_runner():


    dispatcher = TaskDispatcher()


    dispatcher.add_task(

        RuntimeTask(

            task_id="1",

            description="Test task"

        )

    )


    runner = WorkflowRunner(
        dispatcher
    )


    result = await runner.run(
        None
    )


    assert len(result) == 1
from core.runtime import (
    AgentTask,
    ExecutionContext
)



def test_agent_task():

    task = AgentTask(

        task_id="1",

        goal="Test task"

    )


    assert task.goal == "Test task"



def test_execution_context():

    context = ExecutionContext(

        task_id="1",

        goal="Analyze data"

    )


    assert context.task_id == "1"


from core.runtime import (
    TaskDispatcher,
    RuntimeTask
)



def test_task_dispatcher():


    dispatcher = TaskDispatcher()



    task = RuntimeTask(

        task_id="1",

        description="Research AI"

    )


    dispatcher.add_task(
        task
    )


    tasks = dispatcher.get_pending_tasks()


    assert len(tasks) == 1

    assert tasks[0].description == "Research AI"
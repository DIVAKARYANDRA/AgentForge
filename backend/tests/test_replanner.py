from core.planner import (
    Replanner,
    ReplanRequest
)



def test_replanning():


    replanner = Replanner()



    request = ReplanRequest(

        failed_task_id="task_001",

        reason=
        "Search tool unavailable"

    )


    result = replanner.replan(
        request
    )


    assert result.success is True


    assert len(result.new_tasks) == 1
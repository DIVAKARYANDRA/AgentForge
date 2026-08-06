from core.planner import (
    PriorityEngine,
    PlannedTask
)



def test_priority_order():


    engine = PriorityEngine()



    tasks = [

        PlannedTask(

            task_id="1",

            description=
            "Generate final report"

        ),


        PlannedTask(

            task_id="2",

            description=
            "Research competitors"

        ),


        PlannedTask(

            task_id="3",

            description=
            "Analyze pricing"

        )

    ]



    ordered = engine.prioritize(
        tasks
    )



    assert ordered[0].description == (
        "Research competitors"
    )


    assert ordered[1].description == (
        "Analyze pricing"
    )
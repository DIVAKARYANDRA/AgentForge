from core.planner import (
    DependencyBuilder,
    PlannedTask
)



def test_dependency_builder():


    builder = DependencyBuilder()



    tasks = [

        PlannedTask(

            task_id="task1",

            description="Research",

            priority=1

        ),


        PlannedTask(

            task_id="task2",

            description="Analyze",

            priority=2

        ),


        PlannedTask(

            task_id="task3",

            description="Generate report",

            priority=3

        )

    ]



    dependencies = builder.build(
        tasks
    )


    assert len(dependencies) == 2


    assert dependencies[0].task_id == (
        "task2"
    )


    assert dependencies[0].depends_on == (
        "task1"
    )
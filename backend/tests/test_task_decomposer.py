from core.planner import (
    TaskDecomposer
)



def test_task_decomposition():


    decomposer = TaskDecomposer()



    tasks = decomposer.decompose(

        "Research AI startups and create report",

        [
            "research",
            "generation"
        ]

    )


    assert len(tasks) == 2


    assert tasks[0].description == (
        "Research relevant information"
    )
from core.planner import (
    Planner
)


def test_planner_creation():

    planner = Planner()


    plan = planner.create_plan(

        "Research AI startups and create report"

    )


    assert plan.status.value == (
        "planned"
    )


    assert len(plan.tasks) > 0


    assert (
        plan.tasks[0].priority
        <=
        plan.tasks[-1].priority
    )


def test_plan_dependencies():

    planner = Planner()


    plan = planner.create_plan(

        "Research AI startups and create report"

    )


    assert (
        "dependencies"
        in
        plan.metadata
    )
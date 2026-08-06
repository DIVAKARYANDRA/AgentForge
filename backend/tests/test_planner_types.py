from core.planner import (
    AgentGoal,
    PlannedTask,
    ExecutionPlan,
    PlanStatus
)



def test_goal_creation():

    goal = AgentGoal(

        goal_id="1",

        description=
        "Build marketing strategy"

    )


    assert goal.description == (
        "Build marketing strategy"
    )



def test_execution_plan():


    goal = AgentGoal(

        goal_id="1",

        description="Research AI"

    )


    task = PlannedTask(

        task_id="task1",

        description="Collect data"

    )


    plan = ExecutionPlan(

        plan_id="plan1",

        goal=goal,

        tasks=[task]

    )


    assert len(plan.tasks) == 1

    assert plan.status == (
        PlanStatus.CREATED
    )
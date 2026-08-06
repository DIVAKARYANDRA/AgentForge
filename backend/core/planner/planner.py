"""
AgentForge Planner Core.

Creates execution plans.
"""


from core.planner import (
    AgentGoal,
    ExecutionPlan,
    PlanStatus
)
from core.planner.dependency_builder import (
    DependencyBuilder
)

from core.planner.goal_analyzer import (
    GoalAnalyzer
)


from core.planner.task_decomposer import (
    TaskDecomposer
)

from core.planner.priority_engine import (
    PriorityEngine
)

from core.planner.replanner import (
    Replanner
)

class Planner:


    def __init__(self):

        self.analyzer = GoalAnalyzer()

        self.decomposer = TaskDecomposer()

        self.priority_engine = PriorityEngine()

        self.dependency_builder = DependencyBuilder()

        self.replanner = Replanner()



    def create_plan(
        self,
        goal_text: str
    ):


        goal = AgentGoal(

            goal_id="goal_001",

            description=goal_text

        )


        analysis = (
            self.analyzer.analyze(
                goal_text
            )
        )


        tasks = (
            self.decomposer.decompose(

                goal_text,

                analysis.required_capabilities

            )
        )

        tasks = (
            self.priority_engine.prioritize(
                tasks
            )
        )

        dependencies = (
            self.dependency_builder.build(
                tasks
            )
        )


        plan = ExecutionPlan(

            plan_id="plan_001",

            goal=goal,

            tasks=tasks,

            metadata={

                "dependencies":
                    dependencies

            }


        )


        plan.status = (
            PlanStatus.PLANNED
        )


        return plan
"""
AgentForge Replanner.

Handles dynamic plan modification.
"""


from core.planner import (
    ReplanResult,
    PlannedTask
)



class Replanner:
    """
    Creates alternative execution paths.
    """


    def replan(
        self,
        request
    ) -> ReplanResult:


        retry_task = PlannedTask(

            task_id=
                f"retry_{request.failed_task_id}",


            description=
                self.generate_alternative(
                    request.reason
                ),


            priority=1

        )


        return ReplanResult(

            success=True,


            new_tasks=[
                retry_task
            ],


            explanation=
            "Generated recovery task"

        )



    def generate_alternative(
        self,
        reason
    ):


        return f"""
Retry the failed task with an improved strategy.

Previous failure reason:

{reason}

Analyze the previous failure
and attempt a better solution.
"""
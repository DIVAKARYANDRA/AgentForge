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

        """
        Generate recovery plan.
        """


        failed_task = (
            request.failed_task_id
        )


        reason = request.reason



        alternative_task = PlannedTask(

            task_id=
            f"retry_{failed_task}",

            description=
            self.generate_alternative(
                reason
            ),

            priority=1

        )


        return ReplanResult(

            success=True,

            new_tasks=[
                alternative_task
            ],

            explanation=
            "Created alternative task "
            "after failure"

        )



    def generate_alternative(
        self,
        reason:str
    ):


        reason = reason.lower()



        if "search" in reason:

            return (
                "Use available knowledge "
                "sources instead of search"
            )


        if "tool" in reason:

            return (
                "Retry using alternative tool"
            )


        return (
            "Retry task with modified strategy"
        )
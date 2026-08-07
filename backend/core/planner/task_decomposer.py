"""
AgentForge Task Decomposer.

Converts goals into executable tasks.
"""


from core.planner import (
    PlannedTask,
    TaskStatus
)



class TaskDecomposer:
    """
    Breaks complex goals into tasks.
    """



    def decompose(
        self,
        goal: str,
        capabilities=None
    ):

        """
        Convert goal into tasks.
        """


        tasks = []


        text = goal.lower()



        # Research related tasks

        if capabilities and "research" in capabilities:

            tasks.append(

                PlannedTask(

                    task_id="task_001",

                    description=
                    "Research relevant information",

                    priority=1

                )

            )

        # Calculation related tasks

        if capabilities and "calculation" in capabilities:


            tasks.append(

                PlannedTask(

                    task_id="task_001",

                    description=goal,

                    priority=1

                )

            )



        # Analysis related tasks

        if capabilities and "analysis" in capabilities:

            tasks.append(

                PlannedTask(

                    task_id="task_002",

                    description=
                    "Analyze collected information",

                    priority=2

                )

            )



        # Generation related tasks

        if capabilities and "generation" in capabilities:

            tasks.append(

                PlannedTask(

                    task_id="task_003",

                    description=
                    "Generate final output",

                    priority=3

                )

            )



        # Fallback

        if not tasks:

            tasks.append(

                PlannedTask(

                    task_id="task_001",

                    description=goal,

                    priority=1

                )

            )


        return tasks
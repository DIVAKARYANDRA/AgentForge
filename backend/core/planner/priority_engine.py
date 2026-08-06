"""
AgentForge Priority Engine.

Determines execution order
for planned tasks.
"""


from typing import List


from core.planner import (
    PlannedTask
)



class PriorityEngine:
    """
    Assigns execution priority
    to tasks.
    """



    def prioritize(
        self,
        tasks: List[PlannedTask]
    ) -> List[PlannedTask]:

        """
        Sort tasks by priority.
        """


        for task in tasks:

            task.priority = (
                self.calculate_priority(
                    task.description
                )
            )


        return sorted(

            tasks,

            key=lambda task:
                task.priority

        )



    def calculate_priority(
        self,
        description: str
    ) -> int:

        """
        Simple rule-based priority.

        Lower number executes first.
        """


        text = description.lower()



        # Data collection first

        if any(
            word in text
            for word in [
                "research",
                "collect",
                "gather",
                "fetch"
            ]
        ):

            return 1



        # Analysis after collection

        if any(
            word in text
            for word in [
                "analyze",
                "analyse",
                "compare"
            ]
        ):

            return 2



        # Final generation last

        if any(
            word in text
            for word in [
                "generate",
                "create",
                "write",
                "report"
            ]
        ):

            return 3



        return 5
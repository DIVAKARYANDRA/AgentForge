"""
AgentForge Dependency Builder.

Creates relationships between tasks.
"""


from typing import List


from core.planner import (
    PlannedTask,
    TaskDependency
)



class DependencyBuilder:
    """
    Builds task dependency graph.
    """



    def build(
        self,
        tasks: List[PlannedTask]
    ) -> List[TaskDependency]:

        """
        Create dependencies based on priority.
        """


        dependencies = []


        ordered_tasks = sorted(

            tasks,

            key=lambda task:
                task.priority

        )


        for index in range(
            1,
            len(ordered_tasks)
        ):


            current_task = (
                ordered_tasks[index]
            )


            previous_task = (
                ordered_tasks[index - 1]
            )


            dependency = TaskDependency(

                task_id=
                current_task.task_id,


                depends_on=
                previous_task.task_id

            )


            dependencies.append(
                dependency
            )


            current_task.dependencies.append(

                previous_task.task_id

            )


        return dependencies
"""
AgentForge Task Dispatcher.

Responsible for task scheduling
and execution flow.
"""


from typing import List


from core.runtime.runtime_types import (
    RuntimeTask,
    ExecutionStatus
)



class TaskDispatcher:
    """
    Manages agent tasks.
    """



    def __init__(self):

        self.tasks: List[
            RuntimeTask
        ] = []



    def add_task(
        self,
        task: RuntimeTask
    ):

        """
        Add task to queue.
        """

        self.tasks.append(
            task
        )



    def get_pending_tasks(self):

        """
        Return pending tasks.
        """

        return [

            task

            for task in self.tasks

            if task.status ==
            ExecutionStatus.PENDING

        ]



    def update_status(
        self,
        task_id: str,
        status: ExecutionStatus,
        result=None
    ):

        """
        Update task execution status.
        """

        for task in self.tasks:

            if task.task_id == task_id:

                task.status = status

                task.result = result

                break



    def all_completed(self):

        """
        Check if all tasks finished.
        """

        return all(

            task.status ==
            ExecutionStatus.SUCCESS

            for task in self.tasks

        )



    def list_tasks(self):

        return self.tasks

    def create_tasks_from_goal(
        self,
        goal: str
    ):

        """
        Temporary task generation.

        Planner integration comes later.
        """


        task = RuntimeTask(

            task_id="task_001",

            description=goal

        )


        self.add_task(
            task
        )


        return [
            task
        ]
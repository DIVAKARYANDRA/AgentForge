"""
Stores queued task information.
"""


class TaskRepository:

    def __init__(self):

        self.tasks = {}

    def save(
        self,
        task
    ):

        self.tasks[
            task.task_id
        ] = task

    def get(
        self,
        task_id
    ):

        return self.tasks.get(
            task_id
        )

    def all(
        self
    ):

        return list(
            self.tasks.values()
        )
"""
Stores queued task information.
"""
from core.persistence import (
    PersistenceManager
)

class TaskRepository:

    def __init__(self):

        self.tasks = {}
        self.persistence = PersistenceManager()

    def save(
        self,
        task
    ):

        self.tasks[
            task.task_id
        ] = task

        self.persistence.save(
            task.task_id,
            task
        )

    def get(
        self,
        task_id
    ):

        task = self.tasks.get(
            task_id
        )

        if task:

            return task

        return self.persistence.get(
            task_id
        )

    def all(
        self
    ):

        return list(
            self.tasks.values()
        )

    def restore(
        self
    ):

        records = self.persistence.all()

        self.tasks.update(
            records
        )

    @property
    def statistics(
        self
    ):

        return {

            "tasks":

                len(

                    self.tasks

                )

        }

    @property
    def repository_statistics(
        self
    ):

        return self.repository.statistics
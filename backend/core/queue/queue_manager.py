"""
Queue Manager.
"""

from core.queue import (
    TaskQueue
)
from core.queue import (
    TaskRepository
)

class QueueManager:

    def __init__(self):

        self.queue = TaskQueue()
        self.worker = None
        self.repository = TaskRepository()
        self.repository.restore()


    def submit(
        self,
        task
    ):

        self.repository.save(
            task
        )
        self.queue.enqueue(
            task
        )

    def next_task(
        self
    ):

        return self.queue.dequeue()

    @property
    def pending_tasks(
        self
    ):

        return self.queue.size

    def register_worker(
        self,
        worker
    ):

        self.worker = worker

    @property
    def worker_busy(
        self
    ):

        if self.worker is None:

            return False

        return self.worker.busy

    @property
    def status(
        self
    ):

        return {

            "pending":

                self.pending_tasks,

            "worker_busy":

                self.worker_busy

        }

    def task(
        self,
        task_id
    ):

        return self.repository.get(
            task_id
        )

    @property
    def all_tasks(
        self
    ):

        return self.repository.all()

    def submit_async(
        self,
        task
    ):

        self.submit(
            task
        )

        return {

            "task_id":

                task.task_id,

            "status":

                task.status

        }

    @property
    def summary(

        self

    ):

        return {

            "pending":

                self.pending_tasks,

            "worker_busy":

                self.worker_busy,

            "persisted_tasks":

                len(

                    self.repository.all()

                )

        }
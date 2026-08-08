"""
Scheduler Manager.
"""

from core.scheduler import (
    SchedulerEngine
)
from core.scheduler import (
    SchedulerRepository
)

class SchedulerManager:

    def __init__(

        self,

        queue_manager

    ):

        self.engine = SchedulerEngine(

            queue_manager

        )

        self.repository = SchedulerRepository()

        self.repository.restore()

    def schedule(
        self,
        job
    ):

        self.repository.save(
            job
        )

        self.engine.register(
            job
        )

    def cancel(
        self,
        job_id
    ):

        self.engine.remove(
            job_id
        )

        self.repository.delete(
            job_id
        )

    @property
    def jobs(
        self
    ):

        return self.engine.jobs


    def enable(
        self,
        job_id
    ):

        for job in self.engine.jobs:

            if job.job_id == job_id:

                job.enabled = True

                return

    def disable(
        self,
        job_id
    ):

        for job in self.engine.jobs:

            if job.job_id == job_id:

                job.enabled = False

                return

    def daily(
        self,
        job
    ):

        job.interval = 60 * 60 * 24

        self.schedule(
            job
        )

    def hourly(
        self,
        job
    ):

        job.interval = 60 * 60

        self.schedule(
            job
        )

    def weekly(
        self,
        job
    ):

        job.interval = 60 * 60 * 24 * 7

        self.schedule(
            job
        )

    @property
    def statistics(
        self
    ):

        return {

            "jobs":

                len(

                    self.engine.jobs

                ),

            "enabled":

                len(

                    [

                        job

                        for job

                        in self.engine.jobs

                        if job.enabled

                    ]

                )

        }

    @property
    def summary(
        self
    ):

        return {

            "jobs":

                len(

                    self.engine.jobs

                ),

            "persisted_jobs":

                len(

                    self.repository.jobs

                ),

            "running":

                self.engine.running,

            "healthy": True

        }

    def job(
        self,
        job_id
    ):

        return self.repository.get(
            job_id
        )

    @property
    def all_jobs(
        self
    ):

        return list(

            self.repository.jobs.values()

        )

    @property
    def health(
        self
    ):

        return {

            "healthy": True,

            "registered_jobs":

                len(

                    self.repository.jobs

                ),

            "running":

                self.engine.running

        }
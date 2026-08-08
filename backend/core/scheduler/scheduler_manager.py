"""
Scheduler Manager.
"""

from core.scheduler import (
    SchedulerEngine
)


class SchedulerManager:

    def __init__(

        self,

        queue_manager

    ):

        self.engine = SchedulerEngine(

            queue_manager

        )

    def schedule(
        self,
        job
    ):

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

            "running":

                self.engine.running

        }
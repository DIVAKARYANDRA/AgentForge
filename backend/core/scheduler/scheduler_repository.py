"""
Scheduler Repository.
"""

from core.persistence import (
    PersistenceManager
)


class SchedulerRepository:

    def __init__(self):

        self.persistence = PersistenceManager()

        self.jobs = {}

    def save(
        self,
        job
    ):

        self.jobs[
            job.job_id
        ] = job

        self.persistence.save(

            job.job_id,

            job

        )

    def get(
        self,
        job_id
    ):

        job = self.jobs.get(
            job_id
        )

        if job:

            return job

        return self.persistence.get(
            job_id
        )

    def restore(
        self
    ):

        records = self.persistence.all()

        self.jobs.update(
            records
        )

    @property
    def statistics(
        self
    ):

        return {

            "jobs":

                len(

                    self.jobs

                )

        }

    def delete(
        self,
        job_id
    ):

        if job_id in self.jobs:

            del self.jobs[
                job_id
            ]

        self.persistence.delete(
            job_id
        )
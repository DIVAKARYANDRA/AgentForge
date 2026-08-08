"""
Scheduler Engine.
"""

import asyncio
import time


class SchedulerEngine:

    def __init__(

        self,

        queue_manager

    ):

        self.queue_manager = queue_manager

        self.jobs = []

        self.running = False

    def register(
        self,
        job
    ):

        self.jobs.append(
            job
        )

    def remove(
        self,
        job_id
    ):

        self.jobs = [

            job

            for job

            in self.jobs

            if job.job_id != job_id

        ]

    async def start(
        self
    ):

        self.running = True

        while self.running:

            now = time.time()

            for job in self.jobs:

                if not job.enabled:

                    continue

                if (

                    now - job.last_run

                    >= job.interval

                ):

                    self.queue_manager.submit(

                        job.task

                    )

                    job.last_run = now

                    job.run_count += 1

                    if (

                        job.max_runs is not None

                        and

                        job.run_count >= job.max_runs

                    ):

                        job.enabled = False

                    if not job.repeat:

                        job.enabled = False

            await asyncio.sleep(
                1
            )

    def stop(
        self
    ):

        self.running = False

    @property
    def status(
        self
    ):

        return {

            "running":

                self.running,

            "jobs":

                len(

                    self.jobs

                )

        }
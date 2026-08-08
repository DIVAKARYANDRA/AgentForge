"""
Background Worker.
"""

import asyncio


class QueueWorker:

    def __init__(
        self,
        queue_manager,
        runtime_engine
    ):

        self.queue_manager = queue_manager

        self.runtime_engine = runtime_engine

        self.running = False

        self.current_task = None

    async def start(
        self
    ):

        self.running = True

        while self.running:

            task = self.queue_manager.next_task()
            task.status = "RUNNING"

            if task is None:

                await asyncio.sleep(
                    0.5
                )

                continue

            self.current_task = task

            try:

                result = await self.runtime_engine.execute(
                    task
                )

                task.result = result

                task.status = "COMPLETED"

            except Exception as error:

                task.status = "FAILED"

                task.error = str(error)

            self.current_task = None

            await asyncio.sleep(
                0
            )

    def stop(
        self
    ):

        self.running = False

    @property
    def busy(
        self
    ):

        return self.current_task is not None
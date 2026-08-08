"""
Collects runtime statistics.
"""

from core.monitoring import (
    RuntimeMetrics
)


class SystemMetrics:

    def collect(
        self,
        runtime,
        queue=None,
        scheduler=None,
        analytics=None,
        event_manager=None
    ):

        metrics = RuntimeMetrics()

        # -----------------------------
        # Queue
        # -----------------------------

        if queue:

            metrics.queued_tasks = (
                queue.pending_tasks
            )

        # -----------------------------
        # Runtime
        # -----------------------------

        if runtime:

            metrics.running_tasks = (

                1

                if getattr(

                    runtime.lifecycle,

                    "current_state",

                    None

                )

                else 0

            )

        # -----------------------------
        # Scheduler
        # -----------------------------

        if scheduler:

            metrics.active_workflows = (

                len(

                    scheduler.jobs

                )

            )

        # -----------------------------
        # Analytics
        # -----------------------------

        if analytics:

            metrics.tool_executions = (

                analytics.metrics.get(

                    "tool_completed",

                    0

                )

            )

        # -----------------------------
        # Event Bus
        # -----------------------------

        if event_manager:

            metrics.active_agents = (

                len(

                    event_manager.bus.subscriber_count

                )

            )

        return metrics
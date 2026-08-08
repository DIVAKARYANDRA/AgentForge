"""
Mission Control Service.
"""

from core.monitoring import (

    MonitoringRepository,

    DashboardSnapshot,

    RuntimeMetrics,

    SystemHealth,

    SystemMetrics

)


class MonitoringService:

    def __init__(

        self

    ):

        self.repository = (

            MonitoringRepository()

        )

        self.collector = (

            SystemMetrics()

        )

    def snapshot(

        self,

        runtime,

        queue=None,

        scheduler=None,

        analytics=None,

        event_manager=None

    ):

        metrics = self.collector.collect(

            runtime,

            queue,

            scheduler,

            analytics,

            event_manager


        )

        snapshot = DashboardSnapshot(

            metrics=metrics,

            health = SystemHealth(

                runtime=runtime is not None,

                queue=queue is not None,

                scheduler=scheduler is not None,

                event_bus=event_manager is not None,

                memory=getattr(

                    runtime,

                    "memory",

                    None

                )

                is not None,

                providers=getattr(

                    runtime,

                    "provider",

                    None

                )

                is not None

            ),

            analytics=analytics or {}

        )

        self.repository.save(

            snapshot

        )

        return snapshot

    @property
    def latest(

        self

    ):

        return self.repository.latest()
"""
Mission Control Service.
"""

from core.monitoring import (
    MonitoringService
)


class MissionControlService:

    def __init__(

        self,

        runtime,

        queue,

        scheduler,

        analytics,

        event_manager

    ):

        self.monitor = MonitoringService()

        self.runtime = runtime

        self.queue = queue

        self.scheduler = scheduler

        self.analytics = analytics

        self.events = event_manager

    def dashboard(

        self

    ):

        snapshot = self.monitor.snapshot(

            runtime=self.runtime,

            queue=self.queue,

            scheduler=self.scheduler,

            analytics=self.analytics.summary,

            event_manager=self.events

        )

        return {

            "runtime":

                self.runtime_status(),

            "queue":

                self.queue_status(),

            "scheduler":

                self.scheduler_status(),

            "analytics":

                self.analytics_status(),

            "metrics":

                snapshot.metrics.__dict__,

            "health":

                snapshot.health.__dict__

        }

    def runtime_status(
        self
    ):

        return self.runtime.summary

    def queue_status(
        self
    ):

        return self.queue.summary

    def queue_status(
        self
    ):

        return self.queue.summary

    def analytics_status(
        self
    ):

        return self.analytics.summary

    def health_status(
        self
    ):

        snapshot = self.monitor.snapshot(

            runtime=self.runtime,

            queue=self.queue,

            scheduler=self.scheduler,

            analytics=self.analytics.summary,

            event_manager=self.events

        )

        return snapshot.health.__dict__
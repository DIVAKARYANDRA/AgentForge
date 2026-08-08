"""
Monitoring Repository.
"""


class MonitoringRepository:

    def __init__(

        self

    ):

        self.snapshots = []

    def save(
        self,
        snapshot
    ):

        self.snapshots.append(
            snapshot
        )

    def latest(
        self
    ):

        if not self.snapshots:

            return None

        return self.snapshots[-1]
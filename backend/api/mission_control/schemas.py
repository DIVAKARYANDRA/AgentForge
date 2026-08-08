"""
Mission Control Schemas.
"""

from pydantic import BaseModel


class DashboardResponse(BaseModel):

    metrics: dict

    health: dict

    analytics: dict

    runtime: dict

    queue: dict

    scheduler: dict
"""
Standard API Response.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any


@dataclass
class ApiResponse:

    success: bool = True

    data: Any = None

    error: str | None = None

    metadata: dict = field(
        default_factory=dict
    )

    timestamp: str = field(

        default_factory=lambda:

        datetime.utcnow().isoformat()

    )

    def to_dict(
        self
    ):

        return {

            "success": self.success,

            "timestamp": self.timestamp,

            "data": self.data,

            "error": self.error,

            "metadata": self.metadata

        }
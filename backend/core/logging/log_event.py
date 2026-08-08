"""
Structured Log Event.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any


@dataclass
class LogEvent:

    level: str

    module: str

    event: str

    message: str

    context: dict[str, Any] = field(default_factory=dict)

    timestamp: str = field(
        default_factory=lambda: datetime.utcnow().isoformat()
    )
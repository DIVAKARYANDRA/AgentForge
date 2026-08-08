"""
Queued Task.
"""

from dataclasses import dataclass, field
from typing import Dict, Any
import time


@dataclass
class QueuedTask:

    task_id: str

    goal: str

    payload: Dict[str, Any] = field(
        default_factory=dict
    )

    created_at: float = field(
        default_factory=time.time
    )

    metadata: Dict[str, Any] = field(
        default_factory=dict
    )

    status: str = "PENDING"

    result: dict | None = None

    error: str = ""
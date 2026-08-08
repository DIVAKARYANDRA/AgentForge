"""
Scheduled Job.
"""

from dataclasses import dataclass, field
from typing import Dict, Any
import time


@dataclass
class ScheduledJob:

    job_id: str

    task: Any

    interval: int

    last_run: float = 0

    enabled: bool = True

    metadata: Dict[str, Any] = field(
        default_factory=dict
    )

    created_at: float = field(
        default_factory=time.time
    )

    repeat: bool = True

    run_count: int = 0

    max_runs: int | None = None
"""
Common framework types used across AgentForge.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import Any
from uuid import uuid4


class AgentStatus(str, Enum):
    CREATED = "created"
    INITIALIZED = "initialized"
    PLANNING = "planning"
    RUNNING = "running"
    WAITING = "waiting"
    REFLECTING = "reflecting"
    COMPLETED = "completed"
    FAILED = "failed"
    STOPPED = "stopped"


class TaskStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"


class EventSeverity(str, Enum):
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"


@dataclass(slots=True)
class ExecutionContext:
    """
    Shared execution context passed across framework components.
    """

    execution_id: str = field(default_factory=lambda: str(uuid4()))
    agent_id: str = ""
    goal: str = ""
    metadata: dict[str, Any] = field(default_factory=dict)
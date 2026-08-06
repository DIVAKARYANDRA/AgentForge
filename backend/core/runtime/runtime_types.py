"""
AgentForge Runtime Types.

Defines execution lifecycle models.
"""


from enum import Enum


from dataclasses import dataclass, field

from typing import Dict, Any, Optional



class RuntimeStatus(str, Enum):

    CREATED = "created"

    RUNNING = "running"

    WAITING = "waiting"

    COMPLETED = "completed"

    FAILED = "failed"



class ExecutionStatus(str, Enum):

    PENDING = "pending"

    PROCESSING = "processing"

    SUCCESS = "success"

    ERROR = "error"

class AgentLifecycleState(str, Enum):

    CREATED = "created"

    INITIALIZED = "initialized"

    PLANNING = "planning"

    EXECUTING = "executing"

    REFLECTING = "reflecting"

    COMPLETED = "completed"

    FAILED = "failed"



@dataclass
class AgentTask:

    """
    Represents a task given to an agent.
    """

    task_id: str

    goal: str

    status: ExecutionStatus = (
        ExecutionStatus.PENDING
    )

    metadata: Dict[str, Any] = field(
        default_factory=dict
    )

@dataclass
class RuntimeTask:

    """
    Individual executable task.
    """


    task_id: str

    description: str


    status: ExecutionStatus = (
        ExecutionStatus.PENDING
    )


    result: Any = None


    metadata: Dict[str, Any] = field(
        default_factory=dict
    )


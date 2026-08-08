"""
AgentForge Workflow Types.

Core workflow domain models.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Any


class WorkflowStatus(str, Enum):

    CREATED = "created"

    RUNNING = "running"

    COMPLETED = "completed"

    FAILED = "failed"


@dataclass
class WorkflowStep:
    """
    Single workflow step.
    """

    step_id: str

    name: str

    description: str

    condition: str = ""

    enabled: bool = True

    metadata: Dict[str, Any] = field(
        default_factory=dict
    )


@dataclass
class Workflow:
    """
    Complete workflow definition.
    """

    workflow_id: str

    name: str

    description: str

    steps: List[WorkflowStep] = field(
        default_factory=list
    )

    status: WorkflowStatus = (
        WorkflowStatus.CREATED
    )

    metadata: Dict[str, Any] = field(
        default_factory=dict
    )
"""
AgentForge Event Types.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, Any


class EventType(str, Enum):

    TASK_CREATED = "task_created"

    TASK_STARTED = "task_started"

    TASK_COMPLETED = "task_completed"

    TASK_FAILED = "task_failed"

    TOOL_STARTED = "tool_started"

    TOOL_COMPLETED = "tool_completed"

    AGENT_SELECTED = "agent_selected"

    WORKFLOW_STARTED = "workflow_started"

    WORKFLOW_COMPLETED = "workflow_completed"

    WORKFLOW_FAILED = "workflow_failed"


@dataclass
class Event:

    event_id: str

    event_type: EventType

    source: str

    payload: Dict[str, Any] = field(
        default_factory=dict
    )

    metadata: Dict[str, Any] = field(
        default_factory=dict
    )
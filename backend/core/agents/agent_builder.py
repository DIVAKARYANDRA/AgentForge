"""
AgentForge Agent Types.
"""

from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Any


class AgentStatus(str, Enum):

    IDLE = "idle"

    RUNNING = "running"

    COMPLETED = "completed"

    FAILED = "failed"


@dataclass
class AgentCapability:
    """
    Capability owned by an agent.
    """

    name: str

    description: str = ""


@dataclass
class Agent:
    """
    Agent definition.
    """

    agent_id: str

    name: str

    role: str

    description: str

    capabilities: List[AgentCapability] = field(
        default_factory=list
    )

    status: AgentStatus = (
        AgentStatus.IDLE
    )

    metadata: Dict[str, Any] = field(
        default_factory=dict
    )
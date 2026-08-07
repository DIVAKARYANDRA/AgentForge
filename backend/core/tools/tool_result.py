"""
AgentForge Tool Result.

Standard response returned
by every tool.
"""

from dataclasses import dataclass, field

from typing import Any, Dict, List


@dataclass
class ToolResult:
    """
    Standard tool execution result.
    """

    success: bool

    tool_name: str

    input: Dict[str, Any] = field(
        default_factory=dict
    )

    output: Any = None

    error: str = ""

    metadata: Dict[str, Any] = field(
        default_factory=dict
    )

    execution_time: float = 0.0

    logs: List[str] = field(
        default_factory=list
    )

    artifacts: Dict[str, Any] = field(
        default_factory=dict
    )
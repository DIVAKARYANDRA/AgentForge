"""
AgentForge Tool Result Contract.

Standard response format for all tools.
"""


from dataclasses import dataclass, field

from typing import Any, Dict



@dataclass
class ToolResult:
    """
    Standard response returned by tools.
    """


    success: bool


    tool_name: str


    input: Dict = field(
        default_factory=dict
    )


    output: Any = None


    error: str = ""


    metadata: Dict = field(
        default_factory=dict
    )
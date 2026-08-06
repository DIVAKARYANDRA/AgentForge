"""
AgentForge Tool Types.
"""

from dataclasses import dataclass

from typing import Optional



@dataclass
class ToolDecision:
    """
    Represents selected tool decision.
    """


    use_tool: bool = False


    tool_name: Optional[str] = None


    reason: str = ""
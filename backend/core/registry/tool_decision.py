"""
AgentForge Tool Decision Model.

Represents selected agent action.
"""


from dataclasses import dataclass, field

from typing import Dict, Optional



@dataclass
class ToolDecision:
    """
    Represents an AI selected tool action.
    """


    tool_name: Optional[str] = None


    arguments: Dict = field(
        default_factory=dict
    )


    reason: str = ""


    confidence: float = 0.0



    @property
    def use_tool(self):

        return (
            self.tool_name
            is not None
        )
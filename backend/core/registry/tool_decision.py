"""
AgentForge Tool Decision Model.
"""


from dataclasses import dataclass, field

from typing import Dict, Optional



@dataclass(init=False)
class ToolDecision:
    """
    Represents selected agent action.
    """


    tool_name: Optional[str]


    arguments: Dict


    reason: str


    confidence: float



    def __init__(
        self,
        tool_name=None,
        arguments=None,
        reason="",
        confidence=0.0,
        use_tool=None
    ):

        self.tool_name = tool_name


        self.arguments = (
            arguments
            if arguments
            else {}
        )


        self.reason = reason


        self.confidence = confidence


        # backward compatibility
        if use_tool is False:

            self.tool_name = None



    @property
    def use_tool(self):

        return (
            self.tool_name is not None
        )
"""
AgentForge Execution Context.

Carries information during execution.
"""


from dataclasses import dataclass, field


from typing import Dict, Any, List



@dataclass
class ExecutionContext:

    """
    Runtime context shared
    across agent execution.
    """


    task_id: str

    goal: str


    user_id: str = "system"


    data: Dict[str, Any] = field(
        default_factory=dict
    )


    tools: List[str] = field(
        default_factory=list
    )


    memory: Dict[str, Any] = field(
        default_factory=dict
    )
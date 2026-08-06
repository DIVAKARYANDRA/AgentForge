"""
AgentForge Execution Context.

Maintains information shared
during agent execution.
"""


from dataclasses import dataclass, field

from typing import Dict, Any, List



@dataclass
class ExecutionContext:
    """
    Shared context across tasks.
    """


    task_id: str


    goal: str


    previous_results: List[Any] = field(
        default_factory=list
    )


    metadata: Dict[str, Any] = field(
        default_factory=dict
    )



    def add_result(
        self,
        result
    ):

        """
        Store task result.
        """

        self.previous_results.append(
            result
        )



    def get_history(self):

        return self.previous_results
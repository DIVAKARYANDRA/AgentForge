"""
Base Planner Contract.
"""

from abc import ABC, abstractmethod

from core.base.base_types import ExecutionContext


class BasePlanner(ABC):

    """
    Planner interface.
    """

    @abstractmethod
    async def create_plan(
        self,
        goal: str,
        context: ExecutionContext,
    ):
        """
        Create execution plan.
        """
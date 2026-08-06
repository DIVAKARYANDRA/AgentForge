"""
Base Agent Contract.
"""

from abc import ABC, abstractmethod

from core.base.base_types import ExecutionContext


class BaseAgent(ABC):

    """
    Every AI Employee inherits this class.
    """

    @property
    @abstractmethod
    def name(self) -> str:
        ...

    @property
    @abstractmethod
    def description(self) -> str:
        ...

    @abstractmethod
    async def execute(
        self,
        goal: str,
        context: ExecutionContext,
    ):
        """
        Execute a goal.
        """
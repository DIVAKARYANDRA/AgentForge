"""
Base Tool Contract.
"""

from abc import ABC, abstractmethod

from core.base.base_types import ExecutionContext


class BaseTool(ABC):
    """
    Abstract tool interface.
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
        context: ExecutionContext,
        **kwargs,
    ):
        """
        Execute the tool.
        """
"""
Base LLM Provider Contract.
"""

from abc import ABC, abstractmethod

from core.base.base_types import ExecutionContext


class BaseProvider(ABC):
    """
    Abstract interface for all AI providers.
    """

    @property
    @abstractmethod
    def name(self) -> str:
        """Provider name."""

    @abstractmethod
    async def generate(
        self,
        prompt: str,
        context: ExecutionContext,
    ) -> str:
        """
        Generate a response from the provider.
        """
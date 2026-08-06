"""
Base Memory Contract.
"""

from abc import ABC, abstractmethod

from typing import Any


class BaseMemory(ABC):

    """
    Abstract memory interface.
    """

    @abstractmethod
    async def save(
        self,
        key: str,
        value: Any,
    ) -> None:
        ...

    @abstractmethod
    async def load(
        self,
        key: str,
    ) -> Any:
        ...

    @abstractmethod
    async def clear(self) -> None:
        ...
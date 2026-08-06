"""
Runtime Contract.
"""

from abc import ABC, abstractmethod


class BaseRuntime(ABC):

    """
    Runtime interface.
    """

    @abstractmethod
    async def start(self):
        ...

    @abstractmethod
    async def stop(self):
        ...

    @abstractmethod
    async def execute(self):
        ...
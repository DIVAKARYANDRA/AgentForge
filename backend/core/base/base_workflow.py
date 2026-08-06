"""
Workflow Contract.
"""

from abc import ABC, abstractmethod


class BaseWorkflow(ABC):

    """
    Base workflow.
    """

    @abstractmethod
    async def start(self):
        ...

    @abstractmethod
    async def stop(self):
        ...
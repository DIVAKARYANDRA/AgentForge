"""
AgentForge Working Memory.

Stores temporary information
during active agent execution.
"""


from typing import Any, Dict


from core.base.base_memory import BaseMemory



class WorkingMemory(BaseMemory):
    """
    Temporary memory for current task execution.
    """



    def __init__(self):

        self._storage: Dict[
            str,
            Any
        ] = {}



    async def store(
        self,
        key: str,
        value: Any
    ):

        """
        Store temporary information.
        """

        self._storage[key] = value



    async def retrieve(
        self,
        key: str
    ):

        """
        Retrieve temporary information.
        """

        return self._storage.get(
            key
        )



    async def delete(
        self,
        key: str
    ):

        """
        Remove specific memory.
        """

        if key in self._storage:

            del self._storage[key]



    async def clear(
        self
    ):

        """
        Clear all working memory.
        """

        self._storage.clear()



    async def all(
        self
    ):

        """
        Return complete context.
        """

        return self._storage.copy()
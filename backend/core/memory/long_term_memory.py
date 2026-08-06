"""
AgentForge Long Term Memory.

Stores persistent user and agent knowledge.
"""


from typing import Any, Dict


from core.base.base_memory import BaseMemory



class LongTermMemory(BaseMemory):
    """
    Persistent memory implementation.

    Currently in-memory storage.
    Later can migrate to:
    - PostgreSQL
    - Redis
    - Vector Database
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

        self._storage[key] = value



    async def retrieve(
        self,
        key: str
    ):

        return self._storage.get(
            key
        )



    async def delete(
        self,
        key: str
    ):

        if key in self._storage:

            del self._storage[key]



    async def clear(
        self
    ):

        self._storage.clear()



    async def all(
        self
    ):

        return self._storage.copy()
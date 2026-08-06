"""
AgentForge Knowledge Memory.

Stores external knowledge sources.
"""


from typing import Dict, Any


from core.base.base_memory import BaseMemory



class KnowledgeMemory(BaseMemory):
    """
    Stores extracted knowledge.

    Future integrations:
    - Documents
    - Vector DB
    - RAG pipeline
    """



    def __init__(self):

        self._knowledge: Dict[
            str,
            Any
        ] = {}



    async def store(
        self,
        key: str,
        value: Any
    ):

        self._knowledge[key] = value



    async def retrieve(
        self,
        key: str
    ):

        return self._knowledge.get(
            key
        )



    async def delete(
        self,
        key: str
    ):

        if key in self._knowledge:

            del self._knowledge[key]



    async def clear(
        self
    ):

        self._knowledge.clear()



    async def search(
        self,
        query: str
    ):

        """
        Simple search.

        Later replaced by:
        embeddings + vector search.
        """

        results = {}


        for key,value in self._knowledge.items():

            if query.lower() in str(value).lower():

                results[key] = value


        return results
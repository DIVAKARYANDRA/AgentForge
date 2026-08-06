"""
AgentForge Session Memory.

Stores conversation-level context.
"""


from typing import Any, Dict, List


from core.base.base_memory import BaseMemory



class SessionMemory(BaseMemory):
    """
    Memory for active conversations.
    """



    def __init__(self):

        self._messages: List[Dict[str, Any]] = []

        self._metadata: Dict[str, Any] = {}



    async def store(
        self,
        key: str,
        value: Any
    ):

        """
        Store session information.
        """


        if key == "message":

            self._messages.append(
                value
            )

        else:

            self._metadata[key] = value



    async def retrieve(
        self,
        key: str
    ):

        """
        Retrieve session data.
        """


        if key == "messages":

            return self._messages


        return self._metadata.get(
            key
        )



    async def delete(
        self,
        key: str
    ):

        """
        Delete session information.
        """


        if key == "messages":

            self._messages.clear()

        elif key in self._metadata:

            del self._metadata[key]



    async def clear(
        self
    ):

        """
        Clear session.
        """

        self._messages.clear()

        self._metadata.clear()



    async def history(
        self
    ) -> List[Dict[str, Any]]:

        """
        Return conversation history.
        """

        return self._messages.copy()
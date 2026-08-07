"""
Base Tool Contract.
"""


from abc import ABC, abstractmethod

from core.base.base_types import ExecutionContext



class BaseTool(ABC):
    """
    Abstract tool interface.

    Every AgentForge tool must provide:

    - name
    - description
    - capabilities
    - execute()
    """


    @property
    @abstractmethod
    def name(self) -> str:
        ...


    @property
    @abstractmethod
    def description(self) -> str:
        ...


    @property
    def capabilities(self) -> list[str]:
        """
        Describes what this tool can do.

        Used by AI Tool Selection Engine.
        """

        return []



    @property
    def input_schema(self) -> dict:
        """
        Defines expected tool inputs.

        Used for AI-generated arguments.
        """

        return {}
        

    @abstractmethod
    async def execute(
        self,
        context: ExecutionContext,
        **kwargs,
    ):
        """
        Execute the tool.
        """
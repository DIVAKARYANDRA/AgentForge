"""
AgentForge Tool Registry.

Central manager for all available tools.
"""


from typing import Dict, List


from core.base.base_tool import BaseTool

from core.registry.registry_types import (
    ToolRegistration
)




class ToolRegistry:
    """
    Stores and manages tool instances.
    """


    def __init__(self):

        self._tools: Dict[
            str,
            ToolRegistration
        ] = {}



    def register(
        self,
        tool: BaseTool
    ) -> None:
        """
        Register a tool.
        """

        name = tool.name


        self._tools[name] = ToolRegistration(

            name=name,

            tool=tool

        )



    def unregister(
        self,
        name: str
    ) -> None:
        """
        Remove a tool.
        """

        if name in self._tools:

            del self._tools[name]



    def get(
        self,
        name: str
    ) -> BaseTool:
        """
        Retrieve a tool.
        """

        registration = (
            self._tools.get(name)
        )


        if not registration:

            raise KeyError(
                f"Tool not found: {name}"
            )


        return registration.tool



    def list_tools(
        self
    ) -> List[str]:
        """
        Return available tool names.
        """

        return list(
            self._tools.keys()
        )



    def exists(
        self,
        name: str
    ) -> bool:
        """
        Check tool availability.
        """

        return (
            name in self._tools
        )



    def clear(self):

        """
        Remove all tools.
        """

        self._tools.clear()

    def get_tool_metadata(
        self
    ):

        """
        Return complete tool information
        for AI agents.
        """


        metadata = []


        for name, registration in self._tools.items():

            tool = registration.tool


            metadata.append({

                "name":
                    tool.name,


                "description":
                    tool.description,


                "capabilities":
                    getattr(
                        tool,
                        "capabilities",
                        []
                    ),


                "input_schema":
                    getattr(
                        tool,
                        "input_schema",
                        {}

                    )

            })


        return metadata
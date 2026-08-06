"""
AgentForge Tool Factory.

Creates tool instances from loaded plugins.
"""


from core.registry.registry_types import LoadedTool

from core.base.base_tool import BaseTool




class ToolFactory:
    """
    Creates runtime tool objects.
    """



    def create(
        self,
        loaded_tool: LoadedTool
    ) -> BaseTool:
        """
        Create tool instance.
        """

        if loaded_tool.instance:

            return loaded_tool.instance



        instance = (
            loaded_tool.tool_class()
        )



        if not isinstance(
            instance,
            BaseTool
        ):

            raise TypeError(
                "Loaded class is not a valid BaseTool"
            )



        loaded_tool.instance = instance


        return instance
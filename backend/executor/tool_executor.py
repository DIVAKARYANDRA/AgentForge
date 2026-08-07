"""
AgentForge Tool Executor.

Responsible for executing tools
selected by agents.
"""


class ToolExecutor:
    """
    Executes registered tools.
    """



    def __init__(
        self,
        tool_registry
    ):

        self.tool_registry = (
            tool_registry
        )



    async def execute(
        self,
        tool_name,
        context,
        arguments=None
    ):

        """
        Execute selected tool.
        """


        try:

            tool = (
                self.tool_registry
                .get(tool_name)
            )


            result = await tool.execute(

                context,

                **(
                    arguments or {}
                )

            )


            if not self.validate_result(result):

                return {

                    "success": False,

                    "tool": tool_name,

                    "error":
                        "Invalid tool response"

                }



            return result


        except Exception as error:


            return {

                "success": False,

                "tool": tool_name,

                "error": str(error)

            }



    def validate_result(
        self,
        result
    ):

        if result is None:

            return False


        return True
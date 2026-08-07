"""
AgentForge Tool Executor.

Responsible for executing tools
selected by agents.
"""
import time
from core.tools.tool_result import ToolResult

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

            if not self.validate_input(
                tool,
                arguments or {}
            ):

                return {

                    "success": False,

                    "tool_name": tool_name,

                    "error":
                        "Invalid tool input"

                }


            start = time.perf_counter()

            result = await tool.execute(

                context,

                **(arguments or {})

            )

            elapsed = time.perf_counter() - start

            result.execution_time = elapsed

            result.logs.append(

                f"{tool_name} executed successfully"

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


            return ToolResult(

                success=False,

                tool_name=tool_name,

                error=str(error)

            )



    def validate_result(
        self,
        result
    ):

        if result is None:

            return False


        return True

    def validate_input(
        self,
        tool,
        arguments
    ):
        """
        Validate tool arguments
        against tool schema.
        """

        schema = {}

        if hasattr(tool, "input_schema"):

            schema = tool.input_schema


        if not schema:

            return True


        for field in schema.keys():

            if field not in arguments:

                return False


        return True
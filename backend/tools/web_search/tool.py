from core.base.base_tool import BaseTool
from core.base.base_types import ExecutionContext
from core.base.tool_result import ToolResult


class WebSearchTool(BaseTool):

    def __init__(self):
        self.tool_registry = None

    def set_tool_registry(
        self,
        registry
    ):

        self.tool_registry = registry

    @property
    def name(self):
        return "web_search"

    @property
    def category(self):
        return "network"

    @property
    def description(self):
        return "Searches the web."

    @property
    def capabilities(self):
        return [

            "web search",

            "internet search",

            "find information"

        ]

    @property
    def input_schema(self):
        return {

            "query":

                "Search query"

        }

    async def execute(
        self,
        context: ExecutionContext,
        **kwargs
    ):

        query = kwargs.get("query")

        if not query:

            return ToolResult(

                success=False,

                tool_name=self.name,

                error="Query missing"

            )

        if self.tool_registry is None:

            return ToolResult(

                success=False,

                tool_name=self.name,

                error="Tool registry unavailable"

            )

        http_tool = self.tool_registry.get(

            "http_client"

        )

        url = (

            "https://httpbin.org/get"

            f"?query={query}"

        )

        result = await http_tool.execute(

            context,

            url=url

        )

        return ToolResult(

            success=result.success,

            tool_name=self.name,

            input={

                "query": query

            },

            output=result.output,

            error=result.error

        )

    async def health_check(
        self
    ):

        return {

            "healthy": True,

            "message":

                "Web Search ready"

        }
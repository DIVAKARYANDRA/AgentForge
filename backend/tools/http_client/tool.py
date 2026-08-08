import httpx

from core.base.base_tool import BaseTool
from core.base.base_types import ExecutionContext
from core.tools.tool_result import ToolResult


class HttpClientTool(BaseTool):

    @property
    def name(self):
        return "http_client"

    @property
    def category(self):
        return "network"

    @property
    def description(self):
        return "Performs HTTP requests."

    @property
    def capabilities(self):
        return [
            "http get",
            "call api",
            "fetch url"
        ]

    @property
    def input_schema(self):
        return {
            "url": "Target URL"
        }

    async def execute(
        self,
        context: ExecutionContext,
        **kwargs
    ):

        url = kwargs.get("url")

        if not url:

            return ToolResult(

                success=False,

                tool_name=self.name,

                error="URL missing"

            )

        try:

            async with httpx.AsyncClient(

                timeout=10.0

            ) as client:

                response = await client.get(url)

            return ToolResult(

                success=True,

                tool_name=self.name,

                input={

                    "url": url

                },

                output={

                    "status_code": response.status_code,
                    "headers": dict(response.headers),

                    "content": response.text[:5000]

                }

            )

        except Exception as error:

            return ToolResult(

                success=False,

                tool_name=self.name,

                input={

                    "url": url

                },

                error=str(error)

            )

    async def health_check(
        self
    ):

        return {

            "healthy": True,

            "message": "HTTP Client ready"

        }
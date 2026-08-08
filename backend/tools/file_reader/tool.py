from pathlib import Path

from core.base.base_tool import BaseTool

from core.base.base_types import ExecutionContext

from core.base.tool_result import ToolResult


class FileReaderTool(BaseTool):

    @property
    def name(self):

        return "file_reader"


    @property
    def category(self):

        return "filesystem"


    @property
    def description(self):

        return (

            "Reads text files from disk."

        )


    @property
    def capabilities(self):

        return [

            "read file",

            "load text",

            "read document"

        ]


    @property
    def input_schema(self):

        return {

            "path":

                "Path to text file"

        }

    async def execute(
        self,
        context: ExecutionContext,
        **kwargs
    ):

        path = kwargs.get("path")

        if not path:

            return ToolResult(

                success=False,

                tool_name=self.name,

                error="Path missing"

            )

        try:

            file_path = Path(path)

            if not file_path.exists():

                return ToolResult(

                    success=False,

                    tool_name=self.name,

                    input={

                        "path": path

                    },

                    error="File does not exist"

                )

            if file_path.is_dir():

                return ToolResult(

                    success=False,

                    tool_name=self.name,

                    input={

                        "path": path

                    },

                    error="Path is a directory"

                )

            content = file_path.read_text(

                encoding="utf-8"

            )

            return ToolResult(

                success=True,

                tool_name=self.name,

                input={

                    "path": path

                },

                output={

                    "content": content

                }

            )

        except Exception as error:

            return ToolResult(

                success=False,

                tool_name=self.name,

                input={

                    "path": path

                },

                error=str(error)

            )

    async def health_check(
        self
    ):

        return {

            "healthy": True,

            "message":

                "File Reader ready"

        }
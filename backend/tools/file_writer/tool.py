from pathlib import Path

from core.base.base_tool import BaseTool
from core.base.base_types import ExecutionContext
from core.base.tool_result import ToolResult


class FileWriterTool(BaseTool):

    @property
    def name(self):
        return "file_writer"

    @property
    def category(self):
        return "filesystem"

    @property
    def description(self):
        return "Writes text content to a file."

    @property
    def capabilities(self):
        return [
            "write file",
            "save document",
            "create text file"
        ]

    @property
    def input_schema(self):
        return {
            "path": "Destination file path",
            "content": "Text content"
        }

    async def execute(
        self,
        context: ExecutionContext,
        **kwargs
    ):

        path = kwargs.get("path")
        content = kwargs.get("content")

        if not path:

            return ToolResult(
                success=False,
                tool_name=self.name,
                error="Path missing"
            )

        if content is None:

            return ToolResult(
                success=False,
                tool_name=self.name,
                error="Content missing"
            )

        try:

            file_path = Path(path)

            file_path.parent.mkdir(
                parents=True,
                exist_ok=True
            )

            file_path.write_text(
                content,
                encoding="utf-8"
            )

            return ToolResult(

                success=True,

                tool_name=self.name,

                input={

                    "path": path

                },

                output={

                    "written": True,

                    "characters": len(content)

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

    async def health_check(self):

        return {

            "healthy": True,

            "message": "File Writer ready"

        }
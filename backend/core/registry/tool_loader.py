"""
AgentForge Tool Loader.

Responsible for discovering and loading
tool plugins.
"""


import json

from pathlib import Path

from typing import List


from core.registry.registry_types import (
    ToolManifest,
    LoadedTool
)


from core.registry.tool_validator import (
    ToolValidator
)



class ToolLoader:
    """
    Discovers and loads AgentForge tools.
    """


    def __init__(
        self,
        tools_directory: str = "tools"
    ):

        self.tools_directory = Path(
            tools_directory
        )

        self.validator = ToolValidator()



    def discover_tools(self) -> List[Path]:
        """
        Find tool directories.
        """

        if not self.tools_directory.exists():

            return []


        return [

            path

            for path in self.tools_directory.iterdir()

            if path.is_dir()

        ]



    def load_manifest(
        self,
        tool_path: Path
    ) -> ToolManifest:
        """
        Load manifest.json.
        """

        manifest_file = (
            tool_path /
            "manifest.json"
        )


        if not manifest_file.exists():

            raise FileNotFoundError(

                f"Missing manifest: {tool_path}"

            )


        with open(
            manifest_file,
            "r",
            encoding="utf-8"
        ) as file:

            data = json.load(file)



        return ToolManifest(

            **data

        )



    def validate_manifest(
        self,
        manifest: ToolManifest
    ):

        result = self.validator.validate_manifest(
            manifest
        )


        if not result.valid:

            raise ValueError(
                result.errors
            )



        return True
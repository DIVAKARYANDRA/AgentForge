"""
AgentForge Tool Validator.

Validates tool plugins before
loading them into the registry.
"""


from typing import Type


from core.base.base_tool import BaseTool

from core.registry.registry_types import (
    ToolManifest,
    ToolValidationResult
)




class ToolValidator:
    """
    Validates AgentForge tools.
    """



    ALLOWED_PERMISSIONS = {

        "internet_access",

        "filesystem_access",

        "database_access",

        "email_access",

        "github_access"

    }



    def validate_manifest(
        self,
        manifest: ToolManifest
    ) -> ToolValidationResult:
        """
        Validate tool metadata.
        """


        errors = []


        if not manifest.name:

            errors.append(
                "Tool name is required"
            )


        if not manifest.version:

            errors.append(
                "Tool version is required"
            )


        if not manifest.description:

            errors.append(
                "Tool description is required"
            )



        for permission in manifest.permissions:

            if permission not in self.ALLOWED_PERMISSIONS:

                errors.append(
                    f"Invalid permission: {permission}"
                )



        return ToolValidationResult(

            valid=len(errors) == 0,

            errors=errors

        )




    def validate_tool_class(
        self,
        tool_class: Type
    ) -> ToolValidationResult:
        """
        Validate tool implementation.
        """


        errors = []


        if not issubclass(
            tool_class,
            BaseTool
        ):

            errors.append(
                "Tool must inherit BaseTool"
            )



        return ToolValidationResult(

            valid=len(errors) == 0,

            errors=errors

        )
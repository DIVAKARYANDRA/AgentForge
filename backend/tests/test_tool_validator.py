from core.registry.tool_validator import ToolValidator

from core.registry.registry_types import ToolManifest



def test_manifest_validation():

    validator = ToolValidator()


    manifest = ToolManifest(

        name="calculator",

        version="1.0.0",

        description="Calculator tool"

    )


    result = validator.validate_manifest(
        manifest
    )


    assert result.valid
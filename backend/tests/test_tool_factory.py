from core.registry.tool_factory import ToolFactory

from core.registry.registry_types import (
    LoadedTool,
    ToolManifest
)


from tools.calculator.tool import CalculatorTool



def test_tool_factory():

    manifest = ToolManifest(

        name="calculator",

        version="1.0.0",

        description="Calculator"

    )


    loaded_tool = LoadedTool(

        manifest=manifest,

        tool_class=CalculatorTool

    )


    factory = ToolFactory()


    tool = factory.create(
        loaded_tool
    )


    assert isinstance(
        tool,
        CalculatorTool
    )
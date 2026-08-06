from core.registry.tool_registry import ToolRegistry

from tools.calculator.tool import CalculatorTool



def test_register_tool():

    registry = ToolRegistry()


    calculator = CalculatorTool()


    registry.register(
        calculator
    )


    assert registry.exists(
        "calculator"
    )


    tool = registry.get(
        "calculator"
    )


    assert tool.name == "calculator"
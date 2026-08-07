"""
Calculator Tool.
"""


from core.base.base_tool import BaseTool

from core.base.base_types import ExecutionContext



class CalculatorTool(BaseTool):


    @property
    def name(self):

        return "calculator"



    @property
    def description(self):

        return (
            "A specialized calculation tool. "
            "Use this tool whenever the task requires "
            "arithmetic operations, percentages, "
            "addition, subtraction, multiplication, "
            "division, or evaluating mathematical expressions."

        )



    @property
    def capabilities(self):

        return [

            "arithmetic execution",
            "percentage calculation",
            "expression evaluation",
            "mathematical operations"


        ]



    @property
    def input_schema(self):

        return {

            "expression":
                "Mathematical expression to evaluate"

        }



    async def execute(
        self,
        context: ExecutionContext,
        **kwargs
    ):

        expression = kwargs.get(
            "expression",
            ""
        )


        # Temporary implementation
        # Actual calculation engine
        # will be improved later

        return {

            "expression":
                expression,


            "result":
                expression

        }
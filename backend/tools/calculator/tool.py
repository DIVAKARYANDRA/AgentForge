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
            "Performs mathematical calculations "
            "and evaluates arithmetic expressions."
        )



    @property
    def capabilities(self):

        return [

            "mathematics",

            "arithmetic",

            "numeric calculation",

            "expression evaluation"

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
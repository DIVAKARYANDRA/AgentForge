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
            "Performs mathematical calculations"
        )



    async def execute(
        self,
        context: ExecutionContext,
        **kwargs
    ):

        expression = kwargs.get(
            "expression",
            ""
        )


        return {

            "result": expression

        }
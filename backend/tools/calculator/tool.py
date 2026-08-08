"""
Calculator Tool.

Provides safe mathematical execution.
"""


import ast
import operator

from core.base.base_tool import BaseTool

from core.base.base_types import ExecutionContext
from core.tools.tool_result import ToolResult


class CalculatorTool(BaseTool):


    @property
    def name(self):

        return "calculator"



    @property
    def description(self):

        return (
            "A calculator execution tool. "
            "Use this tool for arithmetic operations, "
            "percentage calculations, mathematical expressions, "
            "addition, subtraction, multiplication, and division."
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
            "Expression such as 800*0.25"

        }



    async def execute(
        self,
        context: ExecutionContext,
        **kwargs
    ):

        expression = kwargs.get(
            "expression"
        )


        if not expression:

            return ToolResult(

                success=False,

                tool_name=self.name,

                error="Expression missing"

            )


        try:

            value = self.safe_calculate(
                expression
            )


            return ToolResult(

                success=True,

                tool_name=self.name,

                input={

                    "expression":
                        expression

                },

                output={

                    "value":
                        value

                }

            )


        except Exception as error:


            return ToolResult(

                success=False,

                tool_name=self.name,

                input={

                    "expression":
                        expression

                },

                error=str(error)

            )



    def safe_calculate(
        self,
        expression
    ):

        """
        Safely evaluate mathematical expressions.
        """


        allowed_operations = {

            ast.Add:
                operator.add,

            ast.Sub:
                operator.sub,

            ast.Mult:
                operator.mul,

            ast.Div:
                operator.truediv,

            ast.Pow:
                operator.pow

        }



        def evaluate(node):

            if isinstance(
                node,
                ast.Constant
            ):

                return node.value



            if isinstance(
                node,
                ast.BinOp
            ):

                operation = (
                    allowed_operations.get(
                        type(node.op)
                    )
                )


                if not operation:

                    raise ValueError(
                        "Unsupported operation"
                    )


                return operation(

                    evaluate(node.left),

                    evaluate(node.right)

                )



            raise ValueError(
                "Invalid expression"
            )



        tree = ast.parse(
            expression,
            mode="eval"
        )


        return evaluate(
            tree.body
        )

    @property
    def category(self):

        return "math"
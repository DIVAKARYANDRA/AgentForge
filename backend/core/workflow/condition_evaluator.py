"""
Workflow Condition Evaluator.
"""


class ConditionEvaluator:
    """
    Evaluates workflow conditions.
    """

    def evaluate(
        self,
        condition: str,
        context
    ):

        if not condition:

            return True

        if condition == "always":

            return True

        if condition == "never":

            return False

        return True
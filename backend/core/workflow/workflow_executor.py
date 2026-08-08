"""
Workflow Executor.

Executes registered workflows.
"""

from core.workflow import Workflow


class WorkflowExecutor:
    """
    Executes workflow steps sequentially.
    """

    def __init__(
        self,
        workflow_runner
    ):

        self.workflow_runner = (
            workflow_runner
        )

        from core.workflow import (
            ConditionEvaluator
        )

        self.condition_evaluator = (
            ConditionEvaluator()
        )


    async def execute(
        self,
        workflow: Workflow,
        context
    ):
        """
        Execute workflow.
        """

        results = []

        for step in workflow.steps:

            if not step.enabled:

                continue

            if not self.condition_evaluator.evaluate(

                step.condition,

                context

            ):

                continue

            result = await self.workflow_runner.run_step(

                step,

                context

            )

            results.append(

                {

                    "step": step.name,

                    "result": result

                }

            )

        return results
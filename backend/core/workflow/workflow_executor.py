"""
Workflow Executor.

Executes registered workflows.
"""

from core.workflow import Workflow

from core.events import (
    EventBuilder,
    EventType
)


class WorkflowExecutor:
    """
    Executes workflow steps sequentially.
    """

    def __init__(
        self,
        workflow_runner,
        event_manager=None
    ):

        self.workflow_runner = (
            workflow_runner
        )

        self.event_manager = event_manager

        from core.workflow import (
            ConditionEvaluator
        )

        self.condition_evaluator = (
            ConditionEvaluator()
        )

        self.event_builder = EventBuilder()


    async def execute(
        self,
        workflow: Workflow,
        context
    ):
        """
        Execute workflow.
        """

        if self.event_manager:

            await self.event_manager.publish(

                self.event_builder.create(

                    EventType.WORKFLOW_STARTED,

                    source="workflow",

                    payload={

                        "workflow":
                            workflow.name

                    }

                )

            )

        results = []

        try:

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

                        "step":
                            step.name,

                        "result":
                            result

                    }

                )

            if self.event_manager:

                await self.event_manager.publish(

                    self.event_builder.create(

                        EventType.WORKFLOW_COMPLETED,

                        source="workflow",

                        payload={

                            "workflow":
                                workflow.name

                        }

                    )

                )

            return results

        except Exception as error:

            if self.event_manager:

                await self.event_manager.publish(

                    self.event_builder.create(

                        EventType.WORKFLOW_FAILED,

                        source="workflow",

                        payload={

                            "workflow":
                                workflow.name,

                            "error":
                                str(error)

                        }

                    )

                )

            raise
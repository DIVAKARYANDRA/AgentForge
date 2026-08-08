"""
Multi-Agent Workflow Coordinator.
"""

from core.agents import AgentManager


class MultiAgentWorkflow:
    """
    Coordinates workflow execution
    across multiple agents.
    """

    def __init__(
        self,
        runtime_engine
    ):

        self.agent_manager = AgentManager(
            runtime_engine
        )

    async def execute(
        self,
        workflow,
        context
    ):

        results = []

        for step in workflow.steps:

            runtime_task = self.agent_manager.executor.runtime_engine.dispatcher.create_task(

                step.step_id,

                step.description

            )

            runtime_task.goal = step.description

            runtime_task.metadata = {}

            result = await self.agent_manager.execute(

                runtime_task

            )

            results.append(

                {

                    "step": step.name,

                    "agent": result.get(

                        "agent"

                    ),

                    "result": result

                }

            )

        return results
"""
AgentForge Runtime Engine.

Core execution orchestrator.
"""

from core.runtime.runtime_types import (
    AgentTask,
    AgentLifecycleState
)

from core.runtime.execution_context import (
    ExecutionContext
)

from core.runtime.agent_lifecycle import (
    AgentLifecycleManager
)

from core.runtime.task_dispatcher import (
    TaskDispatcher
)

from core.runtime.workflow_runner import (
    WorkflowRunner
)

class RuntimeEngine:
    """
    Executes agent tasks.
    """



    def __init__(
        self,
        memory=None,
        provider=None,
        tools=None
    ):

        self.memory = memory

        self.provider = provider

        self.tools = tools


        self.lifecycle = (
            AgentLifecycleManager()
        )

        self.dispatcher = (
            TaskDispatcher()
        )

        self.workflow_runner = WorkflowRunner(

            self.dispatcher,

            provider=self.provider,

            memory=self.memory

        )



    async def execute(
        self,
        task: AgentTask
    ):
        """
        Execute agent workflow.
        """


        try:

            # Agent initialization

            self.lifecycle.transition(

                AgentLifecycleState.INITIALIZED

            )


            context = ExecutionContext(

                task_id=task.task_id,

                goal=task.goal

            )

            runtime_task = (
                self.dispatcher.create_tasks_from_goal(
                    task.goal
                )
            )


            # Planning phase

            self.lifecycle.transition(

                AgentLifecycleState.PLANNING

            )


            # Execution phase

            self.lifecycle.transition(

                AgentLifecycleState.EXECUTING

            )


            result = await self.workflow_runner.run(
                context
            )


            # Reflection phase

            self.lifecycle.transition(

                AgentLifecycleState.REFLECTING

            )


            self.lifecycle.transition(

                AgentLifecycleState.COMPLETED

            )


            return {

                "task_id":
                    task.task_id,

                "goal":
                    task.goal,

                "status":
                    "completed",

                "result":
                    result

            }


        except Exception as error:


            self.lifecycle.transition(

                AgentLifecycleState.FAILED

            )


            return {

                "task_id":
                    task.task_id,

                "status":
                    "failed",

                "error":
                    str(error)

            }



    async def run_agent(
        self,
        context
    ):


        if self.provider is None:

            raise RuntimeError(
                "Provider unavailable"
            )


        response = await self.provider.generate(

            context.goal,

            context

        )


        if self.memory:

            await self.memory.store(

                "last_response",

                response

            )


        return response
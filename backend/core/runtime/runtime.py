"""
AgentForge Runtime Engine.

Core execution orchestrator.
"""

from core.runtime.runtime_types import (
    AgentTask,
    AgentLifecycleState
)
from core.registry import (
    ToolSelector
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

from core.memory.memory_types import MemoryType

class RuntimeEngine:
    """
    Executes agent tasks.
    """



    def __init__(
        self,
        memory=None,
        provider=None,
        tools=None,
        planner=None
    ):

        self.memory = memory

        self.provider = provider

        self.tools = tools

        self.planner = planner

        self.tool_selector = ToolSelector()


        self.lifecycle = (
            AgentLifecycleManager()
        )

        self.dispatcher = (
            TaskDispatcher()
        )

        self.workflow_runner = WorkflowRunner(

            self.dispatcher,

            provider=self.provider,

            memory=self.memory,

            tools=self.tools

        )



    async def execute(
        self,
        task: AgentTask
    ):
        """
        Execute agent workflow.
        """

        self.lifecycle = AgentLifecycleManager()



        try:

            # Agent initialization

            self.lifecycle.transition(

                AgentLifecycleState.INITIALIZED

            )


            context = ExecutionContext(

                task_id=task.task_id,

                goal=task.goal

            )

            plan = None

            if self.planner:


                plan = self.planner.create_plan(

                    task.goal

                )


                runtime_tasks = []


                for planned_task in plan.tasks:


                    runtime_task = (

                        self.dispatcher.create_task(

                            planned_task.task_id,

                            planned_task.description

                        )

                    )


                    runtime_tasks.append(
                        runtime_task
                    )

            else:


                runtime_tasks = (

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


                    "plan":

                        plan.metadata
                        if plan
                        else None,


                    "status":
                        "completed",


                    "result":
                        result

                }


        except Exception as error:


            try:

                self.lifecycle.transition(

                    AgentLifecycleState.FAILED

                )

            except Exception:

                pass



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

                MemoryType.SESSION,

                "last_response",

                response

            )

        return response
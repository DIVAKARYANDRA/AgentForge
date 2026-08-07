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

from core.reflection.reflection_engine import (
    ReflectionEngine
)

from core.planner import ReplanRequest

class RuntimeEngine:
    """
    Executes agent tasks.
    """



    def __init__(
        self,
        memory=None,
        provider=None,
        tool_provider=None,
        tools=None,
        planner=None
    ):

        self.memory = memory

        self.provider = provider

        self.tool_provider = tool_provider

        self.tools = tools

        self.planner = planner

        # Retry control
        self.retry_count = 0

        self.max_retries = 3

        self.reflection_engine = ReflectionEngine(

            provider=self.provider

        )


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
            
            tool_provider=self.tool_provider,

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

        self.retry_count = 0



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

            reflection = await self.reflection_engine.evaluate(

                task.goal,

                result,

                context

            )


            if (
                reflection.get("retry")
                and
                self.retry_count < self.max_retries
            ):

                self.retry_count += 1

                replan_request = ReplanRequest(

                    failed_task_id=
                        task.task_id,

                    reason=
                        reflection.get(
                            "reason"
                        ),

                    previous_result=result

                )


                recovery_plan = (
                    self.planner.replanner.replan(
                        replan_request
                    )
                )


                if recovery_plan.success:

                    for retry_task in recovery_plan.new_tasks:

                        self.dispatcher.add_task(
                            retry_task
                        )


                    retry_result = await (
                        self.workflow_runner.run(
                            context
                        )
                    )


                    result.extend(
                        retry_result
                    )


            # Reflection phase

            self.lifecycle.transition(

                AgentLifecycleState.REFLECTING

            )


            if reflection.get(
                "success",
                True
            ):

                self.lifecycle.transition(

                    AgentLifecycleState.COMPLETED

                )

            else:

                self.lifecycle.transition(

                    AgentLifecycleState.FAILED

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

                    "retry_count":
                        self.retry_count,
                    
                    "reflection":
                        reflection,

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
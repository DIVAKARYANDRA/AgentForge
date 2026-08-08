"""
Agent Executor.

Executes tasks using registered agents.
"""

from core.agents import Agent


class AgentExecutor:
    """
    Executes work on behalf of agents.
    """

    def __init__(
        self,
        runtime_engine
    ):

        self.runtime_engine = (
            runtime_engine
        )

    async def execute(

        self,

        agent: Agent,

        task

    ):

        task.metadata[

            "agent"

        ] = agent.name


        task.metadata[

            "agent_role"

        ] = agent.role


        return await self.runtime_engine.execute(

            task

        )

    async def execute_many(

        self,

        agent,

        tasks

    ):

        results = []

        for task in tasks:

            result = await self.execute(

                agent,

                task

            )

            results.append(

                result

            )

        return results
"""
Agent Manager.

Coordinates agent registration,
selection and execution.
"""

from core.agents import (

    AgentRegistry,

    AgentTemplateLoader,

    AgentDelegator,

    AgentExecutor

)


class AgentManager:

    def __init__(
        self,
        runtime_engine
    ):

        self.registry = AgentRegistry()

        AgentTemplateLoader().load(

            self.registry

        )

        self.delegator = AgentDelegator(

            self.registry

        )

        self.executor = AgentExecutor(

            runtime_engine

        )

    async def execute(
        self,
        task
    ):

        agent = self.delegator.delegate(

            task

        )

        if agent is None:

            raise RuntimeError(

                "No suitable agent found."

            )

        return await self.executor.execute(

            agent,

            task

        )
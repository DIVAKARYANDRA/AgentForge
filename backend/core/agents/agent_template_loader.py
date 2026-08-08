"""
Loads built-in agents.
"""

from core.agents.agent_registry import (
    AgentRegistry
)

from core.agents.templates import (
    research_agent,
    writer_agent,
    analyst_agent,
    reviewer_agent
)


class AgentTemplateLoader:

    def load(
        self,
        registry: AgentRegistry
    ):

        registry.register(

            research_agent.create()

        )

        registry.register(

            writer_agent.create()

        )

        registry.register(

            analyst_agent.create()

        )

        registry.register(

            reviewer_agent.create()

        )
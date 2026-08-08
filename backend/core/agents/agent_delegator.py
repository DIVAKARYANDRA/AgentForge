"""
Agent Delegator.

Selects the most appropriate agent
for a task.
"""

from core.agents import AgentRegistry


class AgentDelegator:

    def __init__(
        self,
        registry: AgentRegistry
    ):

        self.registry = registry


        self.capability_map = {

            "calculator":
                "calculator",

            "math":
                "calculator",

            "calculate":
                "calculator",

            "search":
                "web_search",

            "web":
                "web_search",

            "research":
                "web_search",

            "write":
                "file_writer",

            "save":
                "file_writer",

            "file":
                "file_writer"

        }

    def delegate(
        self,
        task
    ):

        if hasattr(
            task,
            "goal"
        ):

            description = task.goal.lower()

        else:

            description = task.lower()

        preferred = None

        if hasattr(
            task_description,
            "metadata"
        ):

            preferred = task_description.metadata.get(

                "preferred_agent"

            )

        if preferred:

            agent = self.registry.get(

                preferred

            )

            if agent:

                return agent

        for keyword, capability in (

            self.capability_map.items()

        ):

            if keyword in description:

                agents = (

                    self.registry.find_by_capability(

                        capability

                    )

                )

                if agents:

                    return agents[0]

        agents = self.registry.list_agents()

        if agents:

            return self.registry.get(

                agents[0]

            )

        return None
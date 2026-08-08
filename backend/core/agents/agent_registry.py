"""
Agent Registry.

Stores registered agents.
"""

from typing import Dict, List

from core.agents import Agent


class AgentRegistry:
    """
    Registry for available agents.
    """

    def __init__(self):

        self._agents: Dict[
            str,
            Agent
        ] = {}

    def register(
        self,
        agent: Agent
    ):

        self._agents[
            agent.name
        ] = agent

    def get(
        self,
        name: str
    ):

        return self._agents.get(
            name
        )

    def list_agents(
        self
    ):

        return list(
            self._agents.keys()
        )

    def unregister(
        self,
        name: str
    ):

        self._agents.pop(
            name,
            None
        )

    def find_by_capability(
        self,
        capability: str
    ):

        matches = []

        for agent in self._agents.values():

            for cap in agent.capabilities:

                if cap.name == capability:

                    matches.append(
                        agent
                    )

                    break

        return matches
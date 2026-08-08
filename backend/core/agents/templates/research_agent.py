from core.agents import AgentBuilder


def create():

    return AgentBuilder().create_agent(

        name="Research Agent",

        role="Research",

        description="Searches for information.",

        capabilities=[

            "web_search",

            "knowledge"

        ]

    )
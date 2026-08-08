from core.agents import AgentBuilder


def create():

    return AgentBuilder().create_agent(

        name="Analysis Agent",

        role="Analysis",

        description="Analyzes information.",

        capabilities=[

            "analysis",

            "calculator"

        ]

    )
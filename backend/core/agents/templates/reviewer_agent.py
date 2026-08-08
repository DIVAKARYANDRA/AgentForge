from core.agents import AgentBuilder


def create():

    return AgentBuilder().create_agent(

        name="Reviewer Agent",

        role="Reviewer",

        description="Reviews outputs before completion.",

        capabilities=[

            "reflection",

            "validation"

        ]

    )
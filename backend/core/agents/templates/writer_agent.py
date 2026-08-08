from core.agents import AgentBuilder


def create():

    return AgentBuilder().create_agent(

        name="Writer Agent",

        role="Writer",

        description="Produces documents and reports.",

        capabilities=[

            "file_writer",

            "documentation"

        ]

    )
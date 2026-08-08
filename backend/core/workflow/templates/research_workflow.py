"""
Research Workflow Template.
"""

from core.workflow import WorkflowBuilder


def create():

    builder = WorkflowBuilder()

    return builder.create_workflow(

        name="Research Workflow",

        description="Research a topic and generate output",

        steps=[

            "Search",

            "Summarize",

            "Write Report"

        ]

    )
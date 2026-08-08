"""
Analysis Workflow Template.
"""

from core.workflow import WorkflowBuilder


def create():

    builder = WorkflowBuilder()

    return builder.create_workflow(

        name="Analysis Workflow",

        description="Analyze input and generate insights",

        steps=[

            "Collect",

            "Analyze",

            "Report"

        ]

    )
"""
Knowledge Workflow Template.
"""

from core.workflow import WorkflowBuilder


def create():

    builder = WorkflowBuilder()

    return builder.create_workflow(

        name="Knowledge Workflow",

        description="Collect and store knowledge",

        steps=[

            "Collect",

            "Validate",

            "Store"

        ]

    )
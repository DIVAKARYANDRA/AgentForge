"""
Workflow Builder.

Creates workflow objects.
"""

import uuid

from core.workflow import (
    Workflow,
    WorkflowStep
)


class WorkflowBuilder:
    """
    Builds workflow definitions.
    """

    def create_workflow(
        self,
        name: str,
        description: str,
        steps
    ):

        workflow_steps = []

        for index, step in enumerate(steps):

            workflow_steps.append(

                WorkflowStep(

                    step_id=f"step_{index+1}",

                    name=step,

                    description=step

                )

            )

        return Workflow(

            workflow_id=str(
                uuid.uuid4()
            ),

            name=name,

            description=description,

            steps=workflow_steps

        )
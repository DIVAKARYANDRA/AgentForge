"""
Workflow Repository.

Stores registered workflows.
"""

from typing import Dict

from core.workflow import Workflow


class WorkflowRepository:
    """
    Stores workflow definitions.
    """

    def __init__(self):

        self._workflows: Dict[
            str,
            Workflow
        ] = {}

    def register(
        self,
        workflow: Workflow
    ):
        """
        Register workflow.
        """

        self._workflows[
            workflow.name
        ] = workflow

    def get(
        self,
        name: str
    ):
        """
        Retrieve workflow.
        """

        return self._workflows.get(
            name
        )

    def list_workflows(
        self
    ):
        """
        List registered workflows.
        """

        return list(

            self._workflows.keys()

        )

    def unregister(
        self,
        name: str
    ):
        """
        Remove workflow.
        """

        self._workflows.pop(

            name,

            None

        )
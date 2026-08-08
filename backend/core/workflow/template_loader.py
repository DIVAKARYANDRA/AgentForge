"""
Workflow Template Loader.
"""

from core.workflow.workflow_repository import (
    WorkflowRepository
)

from core.workflow.templates import (

    research_workflow,

    knowledge_workflow,

    documentation_workflow,

    analysis_workflow

)


class WorkflowTemplateLoader:
    """
    Loads built-in workflow templates.
    """

    def load(
        self,
        repository: WorkflowRepository
    ):

        repository.register(

            research_workflow.create()

        )

        repository.register(

            knowledge_workflow.create()

        )

        repository.register(

            documentation_workflow.create()

        )

        repository.register(

            analysis_workflow.create()

        )
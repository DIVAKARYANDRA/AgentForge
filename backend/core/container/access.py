"""
AgentForge Dependency Access Layer.

Provides a clean interface for retrieving
framework dependencies.
"""


from typing import Any


from app.state import state


from core.container import DependencyType





def get_container():

    """
    Retrieve active application container.
    """

    if state.container is None:

        raise RuntimeError(
            "AgentForge container is not initialized"
        )


    return state.container





def get_dependency(
    dependency_type: DependencyType
) -> Any:

    """
    Retrieve any registered dependency.
    """

    container = get_container()


    return container.get(
        dependency_type
    )





def has_dependency(
    dependency_type: DependencyType
) -> bool:

    """
    Check dependency availability.
    """

    container = get_container()


    return container.exists(
        dependency_type
    )
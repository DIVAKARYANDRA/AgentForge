"""
AgentForge Dependency Injection Container.
"""


from typing import Any, Dict

from core.container.dependency import DependencyType



class Container:
    """
    Central dependency manager.

    Responsible for registering,
    storing and retrieving framework components.
    """


    def __init__(self):

        self._dependencies: Dict[
            DependencyType,
            Any
        ] = {}


    def register(
        self,
        dependency_type: DependencyType,
        instance: Any
    ) -> None:
        """
        Register a dependency.
        """

        self._dependencies[
            dependency_type
        ] = instance



    def get(
        self,
        dependency_type: DependencyType
    ) -> Any:
        """
        Retrieve dependency.
        """

        if dependency_type not in self._dependencies:

            raise KeyError(
                f"Dependency not registered: {dependency_type}"
            )

        return self._dependencies[
            dependency_type
        ]



    def exists(
        self,
        dependency_type: DependencyType
    ) -> bool:
        """
        Check dependency availability.
        """

        return (
            dependency_type
            in self._dependencies
        )



    def clear(self) -> None:
        """
        Clear all dependencies.
        """

        self._dependencies.clear()
"""
Dependency Factory.
"""

from app.service_registry import (
    ServiceRegistry
)


class DependencyFactory:

    def __init__(self):

        self.registry = ServiceRegistry()

    def register(
        self,
        name,
        service
    ):

        self.registry.register(
            name,
            service
        )

    def resolve(
        self,
        name
    ):

        return self.registry.get(
            name
        )
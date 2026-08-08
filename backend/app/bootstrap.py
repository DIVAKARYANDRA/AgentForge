"""
Application Bootstrap.
"""

from app.dependency_factory import (
    DependencyFactory
)


class ApplicationBootstrap:

    def __init__(self):

        self.factory = DependencyFactory()

    def register(
        self,
        name,
        service
    ):

        self.factory.register(
            name,
            service
        )

    def get(
        self,
        name
    ):

        return self.factory.resolve(
            name
        )
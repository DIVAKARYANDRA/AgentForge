"""
AgentForge Mock Provider.

Used for testing framework flow
without external API dependency.
"""


from core.base.base_provider import BaseProvider

from core.base.base_types import ExecutionContext

from core.providers import (
    ProviderResponse,
    ProviderConfig
)

from core.providers import ProviderHealth

class MockProvider(BaseProvider):


    def __init__(
        self,
        config: ProviderConfig
    ):

        self.config = config



    @property
    def name(self) -> str:

        return "mock"



    async def generate(
        self,
        prompt: str,
        context: ExecutionContext
    ) -> str:

        return ProviderResponse(

            content=(
                f"Mock response generated for: {prompt}"
            ),

            provider=self.name,

            model="mock-model"

        )

    async def health_check(self):

        return ProviderHealth(

            name=self.name,

            healthy=True,

            message="Mock provider available"

        )
"""
Provider Factory.

Creates AI providers dynamically.
"""


from core.providers.provider_config import ProviderConfig


from providers import (
    GeminiProvider,
    MockProvider
)




class ProviderFactory:
    """
    Creates provider instances.
    """



    @staticmethod
    def create(
        config: ProviderConfig
    ):


        if config.name == "gemini":

            return GeminiProvider(
                config
            )


        if config.name == "mock":

            return MockProvider(
                config
            )


        raise ValueError(

            f"Unsupported provider: {config.name}"

        )
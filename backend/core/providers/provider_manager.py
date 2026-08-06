"""
AgentForge Provider Manager.

Manages AI providers,
health monitoring and fallback.
"""


from typing import Dict


from core.providers import (
    ProviderConfig,
    ProviderFactory
)



class ProviderManager:


    def __init__(self):

        self.providers: Dict[
            str,
            object
        ] = {}


        self.active_provider = None


        self.fallback_provider = None



    def register_provider(
        self,
        name: str,
        config: ProviderConfig
    ):

        provider = ProviderFactory.create(
            config
        )


        self.providers[name] = provider


        if self.active_provider is None:

            self.active_provider = name



    def set_fallback_provider(
        self,
        name: str
    ):

        if name not in self.providers:

            raise ValueError(
                "Fallback provider not registered"
            )


        self.fallback_provider = name



    def set_active_provider(
        self,
        name: str
    ):

        if name not in self.providers:

            raise ValueError(
                "Provider not found"
            )


        self.active_provider = name



    async def get_provider(self):

        provider = self.providers[
            self.active_provider
        ]


        health = await provider.health_check()


        if health.healthy:

            return provider



        if self.fallback_provider:

            return self.providers[
                self.fallback_provider
            ]


        raise RuntimeError(
            "No healthy provider available"
        )



    async def health_status(self):

        result = {}


        for name, provider in self.providers.items():

            result[name] = await provider.health_check()


        return result



    def status(self):

        return {

            "active_provider":
                self.active_provider,

            "fallback_provider":
                self.fallback_provider,

            "available":
                list(self.providers.keys())

        }
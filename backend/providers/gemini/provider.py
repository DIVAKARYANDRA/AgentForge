"""
Google Gemini Provider.

Production LLM provider implementation.
"""


import google.generativeai as genai
import asyncio

from core.base.base_provider import BaseProvider

from core.base.base_types import ExecutionContext

from core.providers import (
    ProviderResponse,
    ProviderConfig
)

from core.providers.provider_types import ProviderHealth

class GeminiProvider(BaseProvider):


    def __init__(
        self,
        config: ProviderConfig
    ):

        self.config = config


        genai.configure(
            api_key=config.api_key
        )


        self.model = genai.GenerativeModel(
            config.model
        )



    @property
    def name(self):

        return "gemini"



    async def generate(
        self,
        prompt: str,
        context: ExecutionContext
    ):


        response = await asyncio.to_thread(
            self.model.generate_content,
            prompt,
            generation_config={
                "temperature":0
            }
        )


        return ProviderResponse(

            content=response.text,

            provider=self.name,

            model=self.config.model

        )

    async def health_check(self):

        try:

            return ProviderHealth(

                name=self.name,

                healthy=True,

                message="Gemini provider available"

            )


        except Exception as error:


            return ProviderHealth(

                name=self.name,

                healthy=False,

                message=str(error)

            )
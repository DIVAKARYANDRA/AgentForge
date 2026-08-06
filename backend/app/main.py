"""
AgentForge Application Entry Point.
"""

from fastapi import FastAPI

from app.lifespan import lifespan

from api.router import api_router

from config.settings import settings
from api.runtime import router as runtime_router

app = FastAPI(

    title=settings.FRAMEWORK_NAME,

    version=settings.VERSION,

    description=settings.DESCRIPTION,

    lifespan=lifespan

)

app.include_router(
    api_router
)

app.include_router(
    runtime_router
)
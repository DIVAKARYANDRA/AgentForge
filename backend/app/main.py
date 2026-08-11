"""
AgentForge Application Entry Point.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.lifespan import lifespan

from api.router import api_router

from config.settings import settings
from api.runtime import router as runtime_router
from api.mission_control.router import (
    router as mission_router
)

from api.mission_control.websocket import (
    router as websocket_router
)


app = FastAPI(
    title=settings.FRAMEWORK_NAME,
    version=settings.VERSION,
    description=settings.DESCRIPTION,
    lifespan=lifespan
)


# ---------------------------------
# CORS Configuration
# ---------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://agent-forge-psi-one.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------
# API Routers
# ---------------------------------

app.include_router(
    api_router
)

app.include_router(
    runtime_router
)

app.include_router(
    mission_router
)

app.include_router(
    websocket_router
)
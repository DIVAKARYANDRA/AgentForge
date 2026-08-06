"""
Health API.
"""

from fastapi import APIRouter

from config.settings import settings


router = APIRouter(
    tags=["Health"]
)


@router.get("/")
async def root():

    return {

        "framework": settings.FRAMEWORK_NAME,

        "version": settings.VERSION,

        "status": "running"

    }


@router.get("/health")
async def health():

    return {

        "status": "healthy"

    }


@router.get("/version")
async def version():

    return {

        "version": settings.VERSION

    }


@router.get("/status")
async def status():

    return {

        "framework": settings.FRAMEWORK_NAME,

        "environment": settings.ENVIRONMENT,

        "provider": settings.DEFAULT_PROVIDER,

        "status": "ready"

    }
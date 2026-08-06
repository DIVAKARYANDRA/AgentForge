"""
Health API.
"""

from fastapi import APIRouter
from app.state import state
from config.settings import settings
from core.container import (
    get_dependency,
    DependencyType
)
from core.providers import (
    ProviderFactory,
    ProviderConfig
)

from core.base.base_types import ExecutionContext
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


@router.get("/container")
async def container_status():

    return {

        "container_initialized":
            state.container is not None

    }

@router.get("/services")
async def services():

    if not state.container:

        return {

            "status":"container_not_ready"

        }


    return {

        "configuration":
            state.container.exists(
                DependencyType.CONFIG
            ),

        "logger":
            state.container.exists(
                DependencyType.LOGGER
            ),

        "provider":
            state.container.exists(
                DependencyType.PROVIDER
            ),

        "tool_registry":
            state.container.exists(
                DependencyType.TOOL_REGISTRY
            ),

        "runtime":
            state.container.exists(
                DependencyType.RUNTIME
            )

    }


@router.get("/dependency-test")
async def dependency_test():

    config = get_dependency(
        DependencyType.CONFIG
    )


    return {

        "framework":
            config.FRAMEWORK_NAME,

        "version":
            config.VERSION,

        "dependency":
            "working"

    }

@router.get("/tools")
async def tools():

    registry = get_dependency(
        DependencyType.TOOL_REGISTRY
    )


    if hasattr(registry, "list_tools"):
        tool_list = registry.list_tools()
    elif isinstance(registry, dict):
        tool_list = list(registry.keys())
    else:
        tool_list = []

    return {
        "available_tools": tool_list
    }

@router.get("/gemini-test")
async def gemini_test():


    config = ProviderConfig(

        name="gemini",

        model="gemini-3.5-flash",

        api_key=settings.GEMINI_API_KEY

    )


    provider = ProviderFactory.create(
        config
    )


    context = ExecutionContext()


    response = await provider.generate(

        "Explain what an AI agent is in one sentence.",

        context

    )


    return {

        "provider":
            response.provider,

        "model":
            response.model,

        "response":
            response.content

    }
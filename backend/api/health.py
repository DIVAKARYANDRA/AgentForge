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

from core.providers import ProviderManager
from core.memory import MemoryType

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
            ),

        "memory":
            state.container.exists(
                DependencyType.MEMORY
            ),

        "memory_service":
            state.container.exists(
                DependencyType.MEMORY_SERVICE
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

        model="gemini-3.5-flash-lite",

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

@router.get("/providers")
async def providers():

    manager = get_dependency(
        DependencyType.PROVIDER
    )


    return manager.status()


@router.get("/provider-health")
async def provider_health():

    manager = get_dependency(
        DependencyType.PROVIDER
    )


    status = await manager.health_status()


    return {

        name:{
            "healthy":value.healthy,
            "message":value.message
        }

        for name,value in status.items()

    }


@router.get("/memory")
async def memory_status():


    manager = get_dependency(

        DependencyType.MEMORY

    )


    return {

        "available_memories":
            manager.available_memories()

    }

@router.get("/memory-details")
async def memory_details():

    manager = get_dependency(
        DependencyType.MEMORY
    )


    return {

        "available_memories":
            manager.available_memories()

    }

@router.post("/memory/store")
async def store_memory():

    service = get_dependency(
        DependencyType.MEMORY_SERVICE
    )


    await service.remember(

        "favorite_language",

        "Python",

        MemoryType.LONG_TERM

    )


    return {

        "status":"stored"

    }


@router.get("/memory/get")
async def get_memory():

    service = get_dependency(
        DependencyType.MEMORY_SERVICE
    )


    value = await service.recall(

        "favorite_language",

        MemoryType.LONG_TERM

    )


    return {

        "value":value

    }


@router.get("/runtime")
async def runtime_status():


    manager = get_dependency(

        DependencyType.RUNTIME

    )


    return {

        "runtime":

            manager.runtime is not None

    }
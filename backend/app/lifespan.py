"""
AgentForge Application Lifespan.
"""


from contextlib import asynccontextmanager
from core.registry import ToolRegistry
from fastapi import FastAPI
from tools.calculator.tool import CalculatorTool
import logging
from core.providers import (
    ProviderManager,
    ProviderConfig
)

from app.state import state


from core.container import (

    Container,

    DependencyType,

    create_logger,

    create_placeholder_service

)

from core.memory import (
    MemoryManager,
    WorkingMemory,
    SessionMemory
)
from core.memory.memory_types import MemoryType

from config.settings import settings



logger = logging.getLogger(__name__)




@asynccontextmanager
async def lifespan(app: FastAPI):


    logger.info(
        "Starting AgentForge Framework..."
    )


    container = Container()

    container.register(
        DependencyType.CONFIG,
        settings
    )

    container.register(

        DependencyType.LOGGER,

        create_logger()

    )

    tool_registry = ToolRegistry()

    calculator = CalculatorTool()

    tool_registry.register(
        calculator
    )


    container.register(

        DependencyType.TOOL_REGISTRY,

        tool_registry

    )

    # ---------------------------------
    # Register Future Services
    # ---------------------------------

    provider_manager = ProviderManager()


    gemini_config = ProviderConfig(

        name="gemini",

        model="gemini-3.5-flash",

        api_key=settings.GEMINI_API_KEY

    )


    provider_manager.register_provider(

        "gemini",

        gemini_config

    )


    container.register(

        DependencyType.PROVIDER,

        provider_manager

    )

    mock_config = ProviderConfig(

        name="mock",

        model="mock-model"

    )


    provider_manager.register_provider(

        "mock",

        mock_config

    )

    provider_manager.set_fallback_provider(
        "mock"
    )



    container.register(

        DependencyType.RUNTIME,

        create_placeholder_service(
            "runtime_manager"
        )

    )

    memory_manager = MemoryManager()


    working_memory = WorkingMemory()


    session_memory = SessionMemory()



    memory_manager.register_memory(

        MemoryType.WORKING,

        working_memory

    )



    memory_manager.register_memory(

        MemoryType.SESSION,

        session_memory

    )

    container.register(

        DependencyType.MEMORY,

        memory_manager

    )



    state.container = container



    logger.info(
        "Configuration Loaded"
    )

    logger.info(
        "Logger Registered"
    )

    logger.info(
        "Core Services Registered"
    )

    logger.info(
        "AgentForge Framework Ready"
    )


    yield



    logger.info(
        "Stopping AgentForge..."
    )


    state.container = None
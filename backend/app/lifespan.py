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
from services.memory_service import MemoryService
from app.state import state


from core.container import (

    Container,

    DependencyType,

    create_logger
)

from core.memory import (
    MemoryManager,
    WorkingMemory,
    SessionMemory
)
from core.memory.memory_types import MemoryType

from config.settings import settings

from core.memory import (
    LongTermMemory,
    KnowledgeMemory
)

from core.runtime import (
    RuntimeManager
)


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

    memory_manager = MemoryManager()

    
    working_memory = WorkingMemory()


    session_memory = SessionMemory()

    long_term_memory = LongTermMemory()

    knowledge_memory = KnowledgeMemory()

    memory_service = MemoryService(
        memory_manager
    )


    runtime_manager = RuntimeManager()


    runtime_manager.initialize(

        memory=memory_manager,

        provider=await provider_manager.get_provider(),

        tools=tool_registry

    )


    container.register(

        DependencyType.RUNTIME,

        runtime_manager

    )






    memory_manager.register_memory(

        MemoryType.WORKING,

        working_memory

    )



    memory_manager.register_memory(

        MemoryType.SESSION,

        session_memory

    )

    memory_manager.register_memory(

        MemoryType.LONG_TERM,

        long_term_memory

    )



    memory_manager.register_memory(

        MemoryType.KNOWLEDGE,

        knowledge_memory

    )

    container.register(

        DependencyType.MEMORY,

        memory_manager

    )

    container.register(

        DependencyType.MEMORY_SERVICE,

        memory_service

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
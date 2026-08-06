"""
AgentForge Application Lifespan.
"""


from contextlib import asynccontextmanager
from core.registry import ToolRegistry
from fastapi import FastAPI
from tools.calculator.tool import CalculatorTool
import logging


from app.state import state


from core.container import (

    Container,

    DependencyType,

    create_logger,

    create_placeholder_service

)


from config.settings import settings



logger = logging.getLogger(__name__)




@asynccontextmanager
async def lifespan(app: FastAPI):


    logger.info(
        "Starting AgentForge Framework..."
    )


    container = Container()

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
    # Register Logger
    # ---------------------------------

    container.register(

        DependencyType.LOGGER,

        create_logger()

    )



    # ---------------------------------
    # Register Future Services
    # ---------------------------------

    container.register(

        DependencyType.PROVIDER,

        create_placeholder_service(
            "provider_manager"
        )

    )


    container.register(

        DependencyType.TOOL_REGISTRY,

        create_placeholder_service(
            "tool_registry"
        )

    )


    container.register(

        DependencyType.RUNTIME,

        create_placeholder_service(
            "runtime_manager"
        )

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
"""
Application lifespan.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI

import logging

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):

    logger.info("Starting AgentForge...")

    logger.info("Configuration Loaded")

    logger.info("Framework Ready")

    yield

    logger.info("Shutting down AgentForge...")
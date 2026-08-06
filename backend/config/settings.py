"""
AgentForge AI Framework

Global application settings.

Every module in AgentForge should import
the singleton `settings` object instead
of reading environment variables directly.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Global configuration for AgentForge.
    """

    # ---------------------------------------------------------
    # Framework
    # ---------------------------------------------------------

    FRAMEWORK_NAME: str = "AgentForge AI"

    VERSION: str = "1.0.0"

    DESCRIPTION: str = (
        "Build, Deploy & Manage Autonomous AI Employees"
    )

    ENVIRONMENT: str = "development"

    DEBUG: bool = True

    # ---------------------------------------------------------
    # Server
    # ---------------------------------------------------------

    HOST: str = "0.0.0.0"

    PORT: int = 8000

    # ---------------------------------------------------------
    # Authentication
    # ---------------------------------------------------------

    JWT_SECRET: str = "CHANGE_ME"

    JWT_ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # ---------------------------------------------------------
    # Database
    # ---------------------------------------------------------

    DATABASE_URL: str = (
        "postgresql://postgres:postgres@localhost:5432/agentforge"
    )

    # ---------------------------------------------------------
    # AI Provider
    # ---------------------------------------------------------

    DEFAULT_PROVIDER: str = "gemini"

    GEMINI_API_KEY: str | None = None

    OPENAI_API_KEY: str = ""

    CLAUDE_API_KEY: str = ""

    OLLAMA_HOST: str = "http://localhost:11434"

    # ---------------------------------------------------------
    # Runtime
    # ---------------------------------------------------------

    MAX_AGENT_RETRIES: int = 3

    MAX_WORKFLOW_STEPS: int = 100

    DEFAULT_TIMEOUT_SECONDS: int = 300

    # ---------------------------------------------------------
    # Memory
    # ---------------------------------------------------------

    MAX_WORKING_MEMORY_ITEMS: int = 100

    MAX_SESSION_MEMORY_ITEMS: int = 500

    # ---------------------------------------------------------
    # Logging
    # ---------------------------------------------------------

    LOG_LEVEL: str = "INFO"

    LOG_DIRECTORY: str = "logs"

    # ---------------------------------------------------------
    # Telemetry
    # ---------------------------------------------------------

    ENABLE_TELEMETRY: bool = True

    # ---------------------------------------------------------
    # Scheduler
    # ---------------------------------------------------------

    ENABLE_SCHEDULER: bool = True

    # ---------------------------------------------------------
    # Pydantic Configuration
    # ---------------------------------------------------------

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache
def get_settings() -> Settings:
    """
    Return cached application settings.
    """
    return Settings()


settings = get_settings()
"""
AgentForge Framework Constants
"""

FRAMEWORK_NAME = "AgentForge AI"

FRAMEWORK_VERSION = "1.0.0"

COPYRIGHT = "© AgentForge AI"

SUPPORTED_ENVIRONMENTS = (
    "development",
    "testing",
    "production",
)

SUPPORTED_AI_PROVIDERS = (
    "gemini",
    "openai",
    "claude",
    "ollama",
)

DEFAULT_ENCODING = "utf-8"

DEFAULT_TIMEZONE = "UTC"

DEFAULT_LOG_FORMAT = (
    "%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)

MAX_WORKFLOW_DEPTH = 20

MAX_AGENT_DEPTH = 10
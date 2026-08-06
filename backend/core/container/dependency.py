"""
AgentForge Dependency Definitions.

Central location for framework dependency keys.
"""


from enum import Enum


class DependencyType(str, Enum):
    """
    Supported dependency types.
    """

    LOGGER = "logger"

    CONFIG = "config"

    PROVIDER = "provider"

    MEMORY = "memory"

    TOOL_REGISTRY = "tool_registry"

    PLANNER = "planner"

    RUNTIME = "runtime"

    AGENT = "agent"

    MEMORY_SERVICE = "memory_service"
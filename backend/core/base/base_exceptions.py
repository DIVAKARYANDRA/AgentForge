"""
Framework exception hierarchy.
"""


class AgentForgeException(Exception):
    """Base framework exception."""


class PlannerException(AgentForgeException):
    """Planner related errors."""


class RuntimeException(AgentForgeException):
    """Runtime related errors."""


class MemoryException(AgentForgeException):
    """Memory related errors."""


class ToolException(AgentForgeException):
    """Tool related errors."""


class ProviderException(AgentForgeException):
    """LLM provider related errors."""


class WorkflowException(AgentForgeException):
    """Workflow related errors."""
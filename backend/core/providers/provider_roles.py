"""
Provider roles inside AgentForge.
"""


from enum import Enum



class ProviderRole(str, Enum):

    TOOL_SELECTOR = "tool_selector"

    EXECUTOR = "executor"

    PLANNER = "planner"

    REFLECTION = "reflection"
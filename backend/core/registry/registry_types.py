"""
Tool Registry Data Types.
"""


from dataclasses import dataclass, field

from typing import List



@dataclass
class ToolManifest:
    """
    Metadata describing a tool plugin.
    """

    name: str

    version: str

    description: str

    author: str = "AgentForge"

    permissions: List[str] = field(
        default_factory=list
    )

    enabled: bool = True



@dataclass
class ToolValidationResult:
    """
    Result returned after tool validation.
    """

    valid: bool

    errors: List[str] = field(
        default_factory=list
    )

@dataclass
class LoadedTool:
    """
    Represents a successfully loaded tool plugin.
    """

    manifest: ToolManifest

    tool_class: type

    instance: object | None = None


@dataclass
class ToolRegistration:
    """
    Represents a registered tool.
    """

    name: str

    tool: object

    enabled: bool = True
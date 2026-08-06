"""
AgentForge Provider Types.

Defines common provider metadata.
"""


from dataclasses import dataclass, field

from typing import Dict, List



@dataclass
class ProviderMetadata:
    """
    Describes an AI provider.
    """

    name: str

    version: str

    model: str

    capabilities: List[str] = field(
        default_factory=list
    )

    enabled: bool = True



@dataclass
class ProviderResponse:
    """
    Standard response returned
    by all providers.
    """

    content: str

    provider: str

    model: str

    metadata: Dict = field(
        default_factory=dict
    )


@dataclass
class ProviderHealth:
    """
    Provider health information.
    """

    name: str

    healthy: bool

    message: str = ""
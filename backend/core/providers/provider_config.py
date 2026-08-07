"""
AgentForge Provider Types.

Defines common provider metadata.
"""


from dataclasses import dataclass, field

from typing import Dict, List, Any



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
class ProviderConfig:

    name: str
    model: str
    api_key: str = ""
    extra_params: Dict[str, Any] = field(
        default_factory=dict
    )
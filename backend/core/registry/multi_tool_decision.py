from dataclasses import dataclass, field

from typing import List, Dict


@dataclass
class SelectedTool:

    tool_name: str

    arguments: Dict


@dataclass
class MultiToolDecision:

    tools: List[SelectedTool] = field(
        default_factory=list
    )

    reason: str = ""
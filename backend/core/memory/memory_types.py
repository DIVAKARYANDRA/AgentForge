"""
AgentForge Memory Types.

Defines different memory categories.
"""


from enum import Enum

from dataclasses import dataclass

from datetime import datetime

from typing import Any



class MemoryType(str, Enum):
    """
    Supported memory categories.
    """

    WORKING = "working"

    SESSION = "session"

    LONG_TERM = "long_term"

    KNOWLEDGE = "knowledge"



class MemoryScope(str, Enum):
    """
    Memory ownership scope.
    """

    TASK = "task"

    SESSION = "session"

    USER = "user"

    SYSTEM = "system"


@dataclass
class MemoryRecord:
    """
    Represents stored information.
    """

    key: str

    value: Any

    memory_type: MemoryType

    scope: MemoryScope

    created_at: datetime
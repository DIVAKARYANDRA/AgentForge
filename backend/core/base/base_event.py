"""
Base event model.
"""

from abc import ABC
from dataclasses import dataclass, field
from datetime import datetime
from uuid import uuid4


@dataclass(slots=True)
class BaseEvent(ABC):
    """
    Base class for all framework events.
    """

    event_id: str = field(default_factory=lambda: str(uuid4()))
    timestamp: datetime = field(default_factory=datetime.utcnow)
    name: str = ""
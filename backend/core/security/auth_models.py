"""
Authentication Models.
"""

from dataclasses import dataclass, field
from typing import List


@dataclass
class UserContext:

    user_id: str

    username: str

    roles: List[str] = field(
        default_factory=list
    )

    permissions: List[str] = field(
        default_factory=list
    )

    authenticated: bool = False
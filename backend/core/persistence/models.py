"""
Persistence Models.
"""

from dataclasses import dataclass
import time


@dataclass
class StoredRecord:

    key: str

    value: dict

    created_at: float = time.time()

    updated_at: float = time.time()
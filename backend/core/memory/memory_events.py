"""
Memory Event Definitions.
"""


from enum import Enum



class MemoryEventType(str, Enum):

    CREATED = "created"

    UPDATED = "updated"

    DELETED = "deleted"

    CLEARED = "cleared"
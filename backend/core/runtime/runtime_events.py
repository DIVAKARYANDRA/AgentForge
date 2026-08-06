"""
Runtime Events.
"""


from enum import Enum



class RuntimeEventType(str, Enum):


    AGENT_CREATED = (
        "agent_created"
    )


    AGENT_STARTED = (
        "agent_started"
    )


    AGENT_PLANNING = (
        "agent_planning"
    )


    AGENT_EXECUTING = (
        "agent_executing"
    )


    AGENT_REFLECTING = (
        "agent_reflecting"
    )


    AGENT_COMPLETED = (
        "agent_completed"
    )


    AGENT_FAILED = (
        "agent_failed"
    )
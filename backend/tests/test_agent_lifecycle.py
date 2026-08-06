from core.runtime import (
    AgentLifecycleManager,
    AgentLifecycleState
)



def test_lifecycle_flow():


    lifecycle = AgentLifecycleManager()


    lifecycle.transition(
        AgentLifecycleState.INITIALIZED
    )


    lifecycle.transition(
        AgentLifecycleState.PLANNING
    )


    lifecycle.transition(
        AgentLifecycleState.EXECUTING
    )


    assert (
        lifecycle.current_state()
        ==
        AgentLifecycleState.EXECUTING
    )
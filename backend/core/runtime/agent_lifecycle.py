"""
AgentForge Agent Lifecycle Manager.

Controls agent state transitions.
"""


from core.runtime.runtime_types import (
    AgentLifecycleState
)



class AgentLifecycleManager:
    """
    Manages agent execution lifecycle.
    """



    def __init__(self):

        self.state = (
            AgentLifecycleState.CREATED
        )



    def transition(
        self,
        new_state: AgentLifecycleState
    ):


        allowed = {

            AgentLifecycleState.CREATED: [

                AgentLifecycleState.INITIALIZED

            ],


            AAgentLifecycleState.INITIALIZED: [

                AgentLifecycleState.PLANNING,

                AgentLifecycleState.FAILED

            ],


            AgentLifecycleState.PLANNING: [

                AgentLifecycleState.EXECUTING,

                AgentLifecycleState.FAILED

            ],


            AgentLifecycleState.EXECUTING: [

                AgentLifecycleState.REFLECTING,

                AgentLifecycleState.FAILED

            ],


            AgentLifecycleState.REFLECTING: [

                AgentLifecycleState.COMPLETED,

                AgentLifecycleState.FAILED

            ],

            AgentLifecycleState.FAILED: [

                AgentLifecycleState.INITIALIZED

            ]

        }



        possible = allowed.get(
            self.state,
            []
        )


        if new_state not in possible:

            raise ValueError(

                f"Invalid transition: "
                f"{self.state} -> {new_state}"

            )


        self.state = new_state



    def current_state(self):

        return self.state



    def is_completed(self):

        return (
            self.state ==
            AgentLifecycleState.COMPLETED
        )



    def is_failed(self):

        return (
            self.state ==
            AgentLifecycleState.FAILED
        )
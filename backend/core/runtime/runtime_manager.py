"""
AgentForge Runtime Manager.

Creates configured runtime engines.
"""


from core.runtime.runtime import RuntimeEngine


class RuntimeManager:


    def __init__(self):

        self.runtime = None



    def initialize(
        self,
        memory=None,
        provider=None,
        tools=None,
        planner=None,
        tool_provider=None
    ):

        self.runtime = RuntimeEngine(

            memory=memory,

            provider=provider,

            tools=tools,

            planner=planner,

            tool_provider=tool_provider

        )



    def get_runtime(self):

        if not self.runtime:

            raise RuntimeError(
                "Runtime is not initialized"
            )


        return self.runtime
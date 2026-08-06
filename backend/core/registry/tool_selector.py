"""
AgentForge Tool Selection Engine.
"""


from core.registry.tool_types import (
    ToolDecision
)



class ToolSelector:
    """
    Selects appropriate tool
    based on task intent.
    """



    def select(
        self,
        task_description: str,
        available_tools
    ):


        text = (
            task_description.lower()
        )


        if "calculate" in text:

            if "calculator" in available_tools:

                return ToolDecision(

                    use_tool=True,

                    tool_name="calculator",

                    reason=
                    "Calculation task detected"

                )


        if any(
            word in text
            for word in [
                "search",
                "find",
                "latest",
                "research"
            ]
        ):

            if "search" in available_tools:

                return ToolDecision(

                    use_tool=True,

                    tool_name="search",

                    reason=
                    "Research task detected"

                )



        return ToolDecision(

            use_tool=False,

            reason=
            "No matching tool"

        )
"""
AgentForge AI Tool Selection Engine.
"""


import json


from core.registry.tool_decision import (
    ToolDecision
)



class ToolSelector:
    """
    Uses AI reasoning to select tools.
    """



    def __init__(
        self,
        provider=None
    ):

        self.provider = provider



    async def select(
        self,
        task_description,
        tool_metadata
    ):

        """
        Ask AI to select best tool.
        """


        if not self.provider:

            return ToolDecision(

                use_tool=False,

                reason=
                "No provider available"

            )



        prompt = f"""

You are a tool selection agent.

Your job is to decide whether
a tool is required.

User Task:

{task_description}


Available Tools:

{json.dumps(
    tool_metadata,
    indent=2
)}


Rules:

1. Select a tool only if it helps complete the task.
2. Do not invent tools.
3. Return JSON only.

Format:

{{
 "use_tool": true,
 "tool_name": "tool_name",
 "arguments": {{}},
 "reason": "why this tool is required"
}}


If no tool is suitable:

{{
 "use_tool": false,
 "tool_name": null,
 "arguments": {{}},
 "reason": "why no tool is required"
}}

"""


        response = await self.provider.generate(

            prompt,

            None

        )


        return self.parse_response(
            response
        )



    def parse_response(
        self,
        response
    ):

        """
        Convert AI response into ToolDecision.
        """


        try:

            if isinstance(
                response,
                dict
            ):

                data = response


            else:

                data = json.loads(
                    response.content
                )


            return ToolDecision(

                use_tool=data.get(
                    "use_tool",
                    False
                ),


                tool_name=data.get(
                    "tool_name"
                ),


                arguments=data.get(
                    "arguments",
                    {}
                ),


                reason=data.get(
                    "reason",
                    ""
                )

            )


        except Exception:


            return ToolDecision(

                use_tool=False,

                reason=
                "Invalid AI tool decision"

            )
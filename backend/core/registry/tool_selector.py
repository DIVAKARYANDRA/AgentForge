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

You are the Tool Routing Agent inside an autonomous AI system.

Your ONLY responsibility is selecting tools.

You are NOT allowed to answer the user task.

User Task:

{task_description}


Available Tools:

{json.dumps(
    tool_metadata,
    indent=2
)}


Decision Rules:

1. Compare the user task with tool descriptions and capabilities.
2. If a tool capability matches the task, you MUST select that tool.
3. Do NOT reject a tool because the AI model can solve the task itself.
4. Do NOT provide explanations or solutions.
5. Never invent tools.
6. Generate tool arguments when selecting a tool.


Return ONLY JSON:

{{
    "use_tool": true,
    "tool_name": "available_tool_name",
    "arguments": {{
    }},
    "reason": "capability match"
}}


If and only if no available tool matches:

{{
    "use_tool": false,
    "tool_name": null,
    "arguments": {{}},
    "reason": "no matching capability"
}}

"""

        print(
            "AVAILABLE TOOLS:",
            json.dumps(
                tool_metadata,
                indent=2
            )
        )


        response = await self.provider.generate(

            prompt,

            None

        )

        print(
            "TOOL SELECTOR RESPONSE:",
            response.content
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
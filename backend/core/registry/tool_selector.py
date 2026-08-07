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

You are an AI agent tool planner.

Your responsibility is to decide
whether the agent should delegate
the task to an available tool.

Tools are preferred for:
- calculations
- data processing
- external actions
- specialized operations

Do not answer the user directly.
Only decide tool usage.

User Task:

{task_description}


Available Tools:

{json.dumps(
    tool_metadata,
    indent=2
)}


Rules:

1. Always prefer available tools when the task matches a tool capability.
2. Do not solve the task yourself if a suitable tool exists.
3. Never invent tools that are not present in the available tools list.
4. Generate required arguments for the selected tool.
5. Return JSON only.

You are not solving the user task.

You are only deciding delegation.

If a tool capability matches the task,
you MUST select the tool.

Do not perform calculations,
reasoning, summarization, or answers yourself.

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
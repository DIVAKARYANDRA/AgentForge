"""
AgentForge AI Tool Selection Engine.
"""


import json


from core.registry.tool_decision import (
    ToolDecision
)
from core.registry.multi_tool_decision import (
    MultiToolDecision,
    SelectedTool
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

                tool_name=None,

                reason=
                "No provider available"

            )


        prompt = f"""
You are a strict AI tool router.

Your only job is to map the user task
to one available tool.

You must not answer the user.

User Task:

{task_description}


Available Tools:

{json.dumps(
    tool_metadata,
    indent=2
)}


Instructions:

- Select the best matching tool from the list.
- If a tool can perform this task, always select it.
- Do not decide whether the AI itself can answer.
- Do not explain.
- Do not reject simple tasks.
- Return JSON only.


Example:

Task:
Calculate 10 percent of 500


Output:

{{
 "use_tool": true,
 "tool_name": "calculator",
 "arguments": {{
    "expression": "500*0.10"
 }},
 "reason": "Mathematical operation"
}}


Your response format:

{{
 "use_tool": true,
 "tool_name": "",
 "arguments": {{}},
 "reason": ""
}}

If multiple tools are required,
return:

{{
    "tools":[
        {{
            "tool_name":"tool1",
            "arguments":{{}}
        }},
        {{
            "tool_name":"tool2",
            "arguments":{{}}
        }}
    ],
    "reason":"Multiple tools required"
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

                content = response.content.strip()


                # Remove markdown code blocks

                if content.startswith(
                    "```"
                ):

                    content = (
                        content
                        .replace(
                            "```json",
                            ""
                        )
                        .replace(
                            "```",
                            ""
                        )
                        .strip()
                    )


                data = json.loads(
                    content
                )

                if "tools" in data:

                    tools = []

                    for item in data["tools"]:

                        tools.append(

                            SelectedTool(

                                tool_name=item.get(

                                    "tool_name",

                                    ""

                                ),

                                arguments=item.get(

                                    "arguments",

                                    {}

                                )

                            )

                        )

                    return MultiToolDecision(

                        tools=tools,

                        reason=data.get(

                            "reason",

                            ""

                        )

                    )



            tool_name = data.get(
                "tool_name"
            )


            if not tool_name:

                tool_name = None



            return ToolDecision(

                use_tool=(
                    tool_name is not None
                ),

                tool_name=tool_name,

                arguments=data.get(
                    "arguments",
                    {}
                ),

                reason=data.get(
                    "reason",
                    ""
                ),

                confidence=data.get(
                    "confidence",
                    0.0
                )

            )


        except Exception as error:



            return ToolDecision(

                reason=
                f"Invalid AI tool decision: {error}"

            )
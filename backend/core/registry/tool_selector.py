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
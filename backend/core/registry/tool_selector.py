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
to one or more available tools.

You must not answer the user.

User Task:

{task_description}

Available Tools:

{json.dumps(
    tool_metadata,
    indent=2
)}

Instructions:

- Select the minimum number of tools required.
- If one tool is sufficient, return the single-tool format.
- If multiple tools are required, return the multi-tool format.
- Use only the tools provided above.
- Do not invent tool names.
- Do not explain.
- Return JSON only.

Single Tool Format:

{{
  "use_tool": true,
  "tool_name": "",
  "arguments": {{}},
  "reason": ""
}}

Multi Tool Format:

{{
  "tools": [
    {{
      "tool_name": "",
      "arguments": {{}}
    }}
  ],
  "reason": ""
}}

Example 1

Task:
Calculate 10 percent of 500

Output:

{{
  "use_tool": true,
  "tool_name": "calculator",
  "arguments": {{
    "expression": "500*0.10"
  }},
  "reason": "Percentage calculation"
}}

Example 2

Task:
Search latest AI news and save it to ai_news.txt

Output:

{{
  "tools": [
    {{
      "tool_name": "web_search",
      "arguments": {{
        "query": "latest AI news"
      }}
    }},
    {{
      "tool_name": "file_writer",
      "arguments": {{
        "path": "ai_news.txt"
      }}
    }}
  ],
  "reason": "Search then save"
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
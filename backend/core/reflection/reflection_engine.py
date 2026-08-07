"""
AgentForge Reflection Engine.

Evaluates agent task results.
"""


import json



class ReflectionEngine:
    """
    AI based self evaluation engine.
    """


    def __init__(
        self,
        provider=None
    ):

        self.provider = provider



    async def evaluate(
        self,
        goal,
        result,
        context
    ):

        """
        Evaluate execution result.
        """


        if not self.provider:

            return {

                "success": True,

                "reason":
                    "Reflection provider unavailable"

            }



        prompt = f"""

You are a reflection agent.

Your responsibility is to evaluate
whether an agent execution result
satisfies the original goal.


Original Goal:

{goal}



Execution Result:

{result}



Return ONLY JSON:

{{
    "success": true,
    "reason": "",
    "retry": false
}}

"""


        response = await self.provider.generate(

            prompt,

            context

        )


        return self.parse_response(
            response.content
        )



    def parse_response(
        self,
        content
    ):

        try:

            return json.loads(
                content
            )


        except Exception:


            try:

                start = content.find(
                    "{"
                )

                end = content.rfind(
                    "}"
                )


                if start != -1 and end != -1:

                    json_content = (
                        content[start:end+1]
                    )


                    return json.loads(
                        json_content
                    )


            except Exception:

                pass



        return {

            "success": True,

            "reason":
                "Unable to parse reflection response",

            "retry": False

        }
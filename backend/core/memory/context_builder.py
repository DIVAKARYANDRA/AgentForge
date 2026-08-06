"""
Builds AI context from memory.
"""


from typing import List, Dict



class ContextBuilder:
    """
    Converts memory into LLM context.
    """



    def build_session_context(
        self,
        messages: List[Dict]
    ) -> str:

        context = ""


        for message in messages:

            context += (

                f"{message['role']}: "

                f"{message['content']}\n"

            )


        return context
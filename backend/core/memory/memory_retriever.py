"""
AgentForge Memory Retriever.

Retrieves the most relevant past executions.
"""

from difflib import SequenceMatcher


class MemoryRetriever:
    """
    Retrieves relevant execution history.
    """


    def retrieve(
        self,
        goal: str,
        history,
        limit: int = 3
    ):

        if not history:

            return []


        scored = []


        for item in history:

            previous_goal = item.get(
                "goal",
                ""
            )


            similarity = SequenceMatcher(

                None,

                goal.lower(),

                previous_goal.lower()

            ).ratio()


            scored.append(

                (

                    similarity,

                    item

                )

            )


        scored.sort(

            reverse=True,

            key=lambda x: x[0]

        )

        relevant = [

            item

            for _, item

            in scored[:limit]

        ]

        print(
            "RELEVANT MEMORIES:",
            [item["goal"] for item in relevant]
        )

        return relevant
"""
AgentForge Experience Extractor.

Converts executions into reusable experience.
"""


class ExperienceExtractor:
    """
    Extract reusable lessons
    from completed executions.
    """


    def extract(

        self,

        goal,

        result,

        reflection

    ):

        experience = {

            "goal": goal,

            "success": reflection.get(
                "success",
                False
            ),

            "lesson": reflection.get(
                "reason",
                ""
            ),

            "result_summary": str(result)[:300]

        }

        return experience
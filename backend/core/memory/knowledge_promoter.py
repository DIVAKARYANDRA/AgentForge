"""
AgentForge Knowledge Promoter.

Converts repeated successful
experiences into reusable knowledge.
"""


class KnowledgePromoter:
    """
    Builds reusable knowledge
    from experience.
    """


    def promote(

        self,

        experiences

    ):

        if not experiences:

            return []


        promoted = []


        for experience in experiences:

            if not experience.get(

                "success",

                False

            ):

                continue


            promoted.append(

                {

                    "topic":

                        experience["goal"],


                    "knowledge":

                        experience["lesson"]

                }

            )


        return promoted
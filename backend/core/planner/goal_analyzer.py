"""
AgentForge Goal Analyzer.

Understands user objectives
before planning execution.
"""


from core.planner import (
    GoalAnalysis
)



class GoalAnalyzer:
    """
    Analyzes user goals.
    """



    def analyze(
        self,
        goal: str
    ) -> GoalAnalysis:
        """
        Analyze user objective.
        """


        complexity = (
            self._estimate_complexity(
                goal
            )
        )


        capabilities = (
            self._detect_capabilities(
                goal
            )
        )


        requires_tools = (
            len(capabilities) > 0
        )


        return GoalAnalysis(

            objective=goal,

            complexity=complexity,

            requires_tools=requires_tools,

            required_capabilities=
                capabilities

        )



    def _estimate_complexity(
        self,
        goal: str
    ) -> str:


        words = len(
            goal.split()
        )


        if words <= 5:

            return "simple"


        if words <= 15:

            return "medium"


        return "complex"



    def _detect_capabilities(
        self,
        goal: str
    ):


        capabilities = []


        text = goal.lower()



        if any(
            word in text
            for word in [
                "search",
                "research",
                "find",
                "lookup"
            ]
        ):

            capabilities.append(
                "research"
            )



        if any(
            word in text
            for word in [
                "calculate",
                "compute",
                "solve",
                "evaluate",
                "percentage",
                "multiply",
                "divide"
            ]
        ):

            capabilities.append(
                "calculation"
            )



        if any(
            word in text
            for word in [
                "analyze",
                "analysis",
                "compare",
                "evaluate data"
            ]
        ):

            capabilities.append(
                "analysis"
            )



        if any(
            word in text
            for word in [
                "report",
                "document",
                "summary",
                "write"
            ]
        ):

            capabilities.append(
                "generation"
            )


        return capabilities
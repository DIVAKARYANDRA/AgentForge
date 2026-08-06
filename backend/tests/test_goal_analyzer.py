from core.planner import (
    GoalAnalyzer
)



def test_goal_analysis():


    analyzer = GoalAnalyzer()



    result = analyzer.analyze(

        "Research AI startups and create report"

    )



    assert result.complexity == "medium"


    assert result.requires_tools is True


    assert (
        "research"
        in
        result.required_capabilities
    )
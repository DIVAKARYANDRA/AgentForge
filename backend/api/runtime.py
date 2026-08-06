"""
Runtime execution API.
"""


from fastapi import APIRouter


from core.container import (
    get_dependency,
    DependencyType
)


from core.runtime import (
    AgentTask
)



router = APIRouter(
    prefix="/runtime",
    tags=["Runtime"]
)



@router.post("/execute")
async def execute_agent(
    goal:str
):


    runtime_manager = get_dependency(

        DependencyType.RUNTIME

    )


    runtime = runtime_manager.get_runtime()



    task = AgentTask(

        task_id="task_001",

        goal=goal

    )


    result = await runtime.execute(
        task
    )


    return {

        "result":result

    }
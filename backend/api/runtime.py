"""
Runtime execution API.
"""


from fastapi import APIRouter

from core.api import (
    ApiResponse
)
from core.container import (
    get_dependency,
    DependencyType
)


from core.runtime import (
    AgentTask
)
from core.runtime import (
    RuntimeHealthChecker
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


    return ApiResponse(

        data=result

    ).to_dict()


@router.get("/health")
async def runtime_health():


    runtime_manager = get_dependency(

        DependencyType.RUNTIME

    )


    runtime = (
        runtime_manager.get_runtime()
    )


    checker = RuntimeHealthChecker(
        runtime
    )


    return await checker.check()

@router.get("/planner")
async def planner_status():


    runtime_manager = get_dependency(

        DependencyType.RUNTIME

    )


    runtime = (
        runtime_manager.get_runtime()
    )


    return {

        "planner_enabled":

            runtime.planner is not None

    }
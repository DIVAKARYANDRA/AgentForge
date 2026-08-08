"""
Mission Control API.
"""

from fastapi import APIRouter
from core.api import (
    ApiResponse
)

router = APIRouter(

    prefix="/mission-control",

    tags=["Mission Control"]

)
mission_service = None

@router.get(

    "/dashboard"

)
async def dashboard():

    if mission_service is None:

        return {

            "status":

                "not_initialized"

        }

    return ApiResponse(

        data=mission_service.dashboard(),

        metadata={

            "version":"v1",

            "module":"mission_control"

        }

    ).to_dict()

@router.get("/runtime")
async def runtime():

    if mission_service is None:

        return {

            "status":

                "not_initialized"

        }

    return ApiResponse(

        data=mission_service.runtime_status()

    ).to_dict()


@router.get("/queue")
async def queue():

    if mission_service is None:

        return {

            "status":

                "not_initialized"

        }

    return ApiResponse(

        data=mission_service.queue_status()

    ).to_dict()


@router.get("/scheduler")
async def scheduler():

    if mission_service is None:

        return {

            "status":

                "not_initialized"

        }

    return ApiResponse(

        data=mission_service.scheduler_status()

    ).to_dict()


@router.get("/analytics")
async def analytics():

    if mission_service is None:

        return {

            "status":

                "not_initialized"

        }

    return ApiResponse(

        data=mission_service.analytics_status()

    ).to_dict()


@router.get(
    "/health"
)
async def health():

    if mission_service is None:

        return {

            "status":

                "not_initialized"

        }

    return ApiResponse(

        data=mission_service.health_status()

    ).to_dict()


from fastapi import WebSocket

from core.streaming import (
    WebSocketManager
)

manager = WebSocketManager()


@router.websocket(
    "/events"
)
async def events(
    websocket: WebSocket
):

    await manager.connect(
        websocket
    )

    try:

        while True:

            await websocket.receive_text()

    except Exception:

        manager.disconnect(
            websocket
        )
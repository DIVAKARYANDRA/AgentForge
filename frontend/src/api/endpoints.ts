/**
 * Every path below corresponds to a route that actually exists in the
 * backend, traced through app/main.py's four mounted routers:
 *   - api_router      (api/router.py -> api/health.py, no prefix)
 *   - runtime_router   (api/runtime.py, prefix /runtime)
 *   - mission_router    (api/mission_control/router.py, prefix /mission-control)
 *   - websocket_router  (api/mission_control/websocket.py)
 *
 * There is deliberately no equivalent list for agents/workflows/tools
 * (detail)/knowledge/analytics/settings/auth — those routers don't exist
 * in this backend snapshot. Search this repo's api/ folder before adding
 * anything here; do not invent paths.
 */
export const ENDPOINTS = {
  // api/health.py — no prefix
  root: "/",
  health: "/health",
  version: "/version",
  status: "/status",
  containerStatus: "/container",
  services: "/services",
  toolNames: "/tools",
  providers: "/providers",
  providerHealth: "/provider-health",
  memoryAvailable: "/memory",
  memoryDetails: "/memory-details",

  // api/runtime.py — prefix /runtime
  runtimeExecute: "/runtime/execute",
  runtimeHealth: "/runtime/health",
  runtimePlanner: "/runtime/planner",

  // api/mission_control/router.py — prefix /mission-control
  missionDashboard: "/mission-control/dashboard",
  missionRuntime: "/mission-control/runtime",
  missionQueue: "/mission-control/queue",
  missionScheduler: "/mission-control/scheduler",
  missionAnalytics: "/mission-control/analytics",
  missionHealth: "/mission-control/health",

  // api/mission_control/websocket.py — same prefix, ws:// scheme
  missionEvents: "/mission-control/events",
} as const;

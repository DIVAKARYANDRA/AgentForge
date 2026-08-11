import { useQuery } from "@tanstack/react-query";
import { missionControlApi } from "@/api/missionControl";

export const missionControlKeys = {
  all: ["mission-control"] as const,
  dashboard: () => [...missionControlKeys.all, "dashboard"] as const,
  runtime: () => [...missionControlKeys.all, "runtime"] as const,
  queue: () => [...missionControlKeys.all, "queue"] as const,
  scheduler: () => [...missionControlKeys.all, "scheduler"] as const,
  analytics: () => [...missionControlKeys.all, "analytics"] as const,
  health: () => [...missionControlKeys.all, "health"] as const,
};

/** Full dashboard payload. Backed by a real route, but see api/missionControl.ts — depends on services that may be None server-side. */
export function useMissionControlDashboard() {
  return useQuery({
    queryKey: missionControlKeys.dashboard(),
    queryFn: ({ signal }) => missionControlApi.dashboard(signal),
  });
}

/** The one Mission Control resource backed by a fully real, live dependency (RuntimeManager). */
export function useMissionControlRuntime() {
  return useQuery({
    queryKey: missionControlKeys.runtime(),
    queryFn: ({ signal }) => missionControlApi.runtime(signal),
  });
}

export function useMissionControlQueue() {
  return useQuery({
    queryKey: missionControlKeys.queue(),
    queryFn: ({ signal }) => missionControlApi.queue(signal),
  });
}

export function useMissionControlScheduler() {
  return useQuery({
    queryKey: missionControlKeys.scheduler(),
    queryFn: ({ signal }) => missionControlApi.scheduler(signal),
  });
}

export function useMissionControlAnalytics() {
  return useQuery({
    queryKey: missionControlKeys.analytics(),
    queryFn: ({ signal }) => missionControlApi.analytics(signal),
  });
}

/**
 * Platform health snapshot. Not currently consumed anywhere — the header's
 * live status indicator uses useRuntimeHealth() instead, since
 * /mission-control/health calls MonitoringService.snapshot() with
 * queue/scheduler/analytics all None and may error. No refetchInterval
 * here on purpose: don't auto-poll a route this fragile until something
 * actually depends on it.
 */
export function useMissionControlHealth() {
  return useQuery({
    queryKey: missionControlKeys.health(),
    queryFn: ({ signal }) => missionControlApi.health(signal),
  });
}

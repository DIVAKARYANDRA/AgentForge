import { useQuery } from "@tanstack/react-query";
import { getAnalyticsSnapshot } from "@/api/analytics";

export const analyticsKeys = { all: ["analytics"] as const };

/** See api/analytics.ts — derived from the same mock datasets other modules use; /mission-control/analytics exists but errors server-side. */
export function useAnalyticsSnapshot() {
  return useQuery({ queryKey: analyticsKeys.all, queryFn: getAnalyticsSnapshot, staleTime: Infinity });
}

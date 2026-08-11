import { QueryClient } from "@tanstack/react-query";

/**
 * One QueryClient for the whole app. Defaults are tuned for a backend
 * that (per api/router.py) is still partial — several endpoints depend
 * on services the lifespan wires up as `None` (queue, scheduler,
 * analytics) and will legitimately error. We retry modestly, then let
 * the error state and Retry button (see hooks/*) take over rather than
 * retrying forever against a 500 that won't resolve itself.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
      staleTime: 15_000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

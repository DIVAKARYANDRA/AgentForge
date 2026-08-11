import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { executeAgentTask, getPlannerStatus, getRuntimeHealth } from "@/api/runtime";

export const runtimeKeys = {
  all: ["runtime"] as const,
  health: () => [...runtimeKeys.all, "health"] as const,
  planner: () => [...runtimeKeys.all, "planner"] as const,
};

export function useRuntimeHealth() {
  return useQuery({
    queryKey: runtimeKeys.health(),
    queryFn: ({ signal }) => getRuntimeHealth(signal),
    refetchInterval: 30_000,
  });
}

export function usePlannerStatus() {
  return useQuery({
    queryKey: runtimeKeys.planner(),
    queryFn: ({ signal }) => getPlannerStatus(signal),
  });
}

/** Dispatches a real run via POST /runtime/execute. Not wired to any UI in this pass — available for a future "Launch Workflow" action. */
export function useExecuteAgentTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (goal: string) => executeAgentTask(goal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: runtimeKeys.all });
    },
  });
}

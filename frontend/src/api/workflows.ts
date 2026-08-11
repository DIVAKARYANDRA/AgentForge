import { workflows } from "@/data/workflows";
import type { Workflow } from "@/types/workflow";

/**
 * core/workflow/ (workflow_types.py, condition_evaluator.py, templates/,
 * workflow_repository.py) exists server-side, but no api/workflows.py
 * router is mounted in app/main.py — there's no /workflows route to
 * call. See api/agents.ts for the same reasoning; this file exists so
 * hooks/useWorkflows.ts has something real to import today and only
 * needs its internals swapped once a route ships.
 */
export async function getWorkflows(): Promise<Workflow[]> {
  return workflows;
}

import type { AgentTool } from "@/types/agent";

/**
 * UI-facing workflow status. The backend's WorkflowStatus is
 * created/running/completed/failed (raw execution state); this adds
 * "paused" for workflows an operator has intentionally suspended, and
 * renames "created" -> "paused" / "running" -> "active" to match what an
 * operator scans a workflow list for. Maps back onto the backend enum
 * once the API is wired: active -> running, paused -> created,
 * completed -> completed, failed -> failed.
 */
export type WorkflowStatus = "active" | "completed" | "failed" | "paused";

export type WorkflowCategory =
  | "automation"
  | "research"
  | "data-processing"
  | "support";

/**
 * What a step actually does. "agent" steps hand off to an agent's own
 * reasoning, "tool" steps call a single registered tool, "process" steps
 * are internal transforms (extraction, validation, generation) with no
 * external call, and "decision" steps branch based on a condition.
 */
export type WorkflowStepType = "agent" | "tool" | "process" | "decision";

export type WorkflowStepStatus = "completed" | "running" | "pending" | "failed";

export interface WorkflowStep {
  id: string;
  name: string;
  type: WorkflowStepType;
  /** Agent id (see data/agents.ts) this step hands off to, if type is "agent". */
  agentId?: string;
  /** Tool slug this step calls, if type is "tool". */
  toolSlug?: string;
  status: WorkflowStepStatus;
  /** 1-based position in the pipeline; also drives graph left-to-right order. */
  order: number;
  /** Human-readable gating rule, e.g. "confidence > 0.8". Empty/undefined = unconditional. */
  condition?: string;
}

export interface WorkflowAgentAssignment {
  agentId: string;
  /** This workflow's label for what the agent does here — may differ from the agent's global role. */
  roleInWorkflow: string;
}

export interface WorkflowCondition {
  id: string;
  /** The step this rule gates. */
  stepId: string;
  stepName: string;
  rule: string;
  description: string;
}

export interface WorkflowExecutionMetrics {
  totalRuns: number;
  successfulRuns: number;
  failedRuns: number;
  avgDuration: string;
}

export interface WorkflowExecutionRecord {
  id: string;
  status: "completed" | "running" | "failed";
  duration: string;
  timestamp: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  category: WorkflowCategory;
  agents: WorkflowAgentAssignment[];
  steps: WorkflowStep[];
  tools: AgentTool[];
  conditions: WorkflowCondition[];
  executionMetrics: WorkflowExecutionMetrics;
  executionHistory: WorkflowExecutionRecord[];
  lastExecution: string;
  createdAt: string;
}

export const WORKFLOW_STATUS_LABELS: Record<WorkflowStatus, string> = {
  active: "Active",
  completed: "Completed",
  failed: "Failed",
  paused: "Paused",
};

export const WORKFLOW_CATEGORY_LABELS: Record<WorkflowCategory, string> = {
  automation: "Automation",
  research: "Research",
  "data-processing": "Data Processing",
  support: "Support",
};

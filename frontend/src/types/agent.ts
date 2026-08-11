import type { LucideIcon } from "lucide-react";

/**
 * UI-facing agent status. Distinct from the backend's raw execution
 * status (idle / running / completed / failed) — "healthy" here means
 * "idle and last run succeeded," which is what an operator actually
 * wants to scan for on a fleet view. Maps 1:1 onto AgentStatus once the
 * API is wired: completed-with-no-errors -> healthy, running -> running,
 * idle-untested -> idle, completed-with-errors -> failed.
 */
export type AgentStatus = "healthy" | "running" | "idle" | "failed";

/**
 * Mirrors the roles agents register under in the backend (planner,
 * researcher, executor, monitor templates) plus "knowledge," which the
 * backend's Knowledge Agent occupies today without a dedicated template.
 */
export type AgentRole =
  | "planner"
  | "researcher"
  | "executor"
  | "monitor"
  | "knowledge";

export interface AgentCapability {
  id: string;
  name: string;
  description: string;
}

/**
 * A tool an agent is allowed to call. `slug` matches the backend tool
 * registry's identifiers (calculator, web_search, file_writer, ...) so
 * this maps directly onto ToolRegistry entries later.
 */
export interface AgentTool {
  id: string;
  slug: string;
  name: string;
  icon: LucideIcon;
}

export interface AgentWorkflowRef {
  id: string;
  name: string;
  /** The agent's part in this workflow, e.g. "Planning stage". */
  stage: string;
  status: "active" | "paused" | "completed";
}

export interface AgentMemoryActivity {
  id: string;
  summary: string;
  timestamp: string;
}

/**
 * Snapshot of an agent's memory subsystems. Working/session memory map to
 * the backend's SessionMemory; knowledgeItems maps to entries the agent
 * has contributed to the shared knowledge base.
 */
export interface AgentMemorySnapshot {
  workingMemoryItems: number;
  sessionMemoryItems: number;
  knowledgeItems: number;
  usagePercent: number;
  recentActivity: AgentMemoryActivity[];
}

export interface AgentKnowledgeSnapshot {
  entries: number;
  lastUpdated: string;
  topContribution: string;
}

export interface AgentMetrics {
  successRate: number;
  avgExecutionTime: string;
  totalExecutions: number;
}

export interface AgentExecutionRecord {
  id: string;
  task: string;
  status: "completed" | "running" | "failed";
  duration: string;
  timestamp: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  role: AgentRole;
  status: AgentStatus;
  capabilities: AgentCapability[];
  tools: AgentTool[];
  workflows: AgentWorkflowRef[];
  memory: AgentMemorySnapshot;
  knowledge: AgentKnowledgeSnapshot;
  metrics: AgentMetrics;
  executionHistory: AgentExecutionRecord[];
  createdAt: string;
  lastActive: string;
}

export const AGENT_ROLE_LABELS: Record<AgentRole, string> = {
  planner: "Planner",
  researcher: "Researcher",
  executor: "Executor",
  monitor: "Monitor",
  knowledge: "Knowledge",
};

export const AGENT_STATUS_LABELS: Record<AgentStatus, string> = {
  healthy: "Healthy",
  running: "Running",
  idle: "Idle",
  failed: "Failed",
};

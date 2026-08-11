import type { LucideIcon } from "lucide-react";

/**
 * Matches ToolRegistry.categories exactly — the backend defaults an
 * unregistered tool's category to "general", but every tool actually
 * registered today (calculator, web_search, http_client, file_reader,
 * file_writer) falls into one of these three.
 */
export type ToolCategory = "math" | "network" | "filesystem";

/**
 * UI-facing health status. The backend has no dedicated tool health-check
 * module yet — this reuses the same healthy/degraded/down vocabulary
 * System Health already established on Mission Control, so a tool's
 * status reads consistently with every other subsystem in the product.
 */
export type ToolStatus = "healthy" | "degraded" | "down";

export interface ToolHealth {
  status: ToolStatus;
  lastCheck: string;
  /** 0-100. Uptime over the current monitoring window. */
  availability: number;
}

export interface ToolExecutionMetrics {
  totalExecutions: number;
  successRate: number;
  avgExecutionTime: string;
}

export interface ToolExecution {
  id: string;
  task: string;
  agent: string;
  workflow?: string;
  status: "completed" | "running" | "failed";
  duration: string;
  timestamp: string;
}

export interface Tool {
  id: string;
  /** Matches the backend tool's registered name exactly, e.g. "calculator". */
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  status: ToolStatus;
  icon: LucideIcon;
  /**
   * Flat capability phrases, same shape as BaseTool.capabilities in the
   * backend (a list[str], not structured objects) — kept as-is rather
   * than reshaped into {id, name, description} the way Agent
   * capabilities were, since this maps 1:1 onto the real property.
   */
  capabilities: string[];
  /**
   * Matches BaseTool.input_schema exactly: a flat map of parameter name
   * to a human-readable description, not a full JSON Schema document.
   */
  inputSchema: Record<string, string>;
  agentIds: string[];
  workflowIds: string[];
  executionMetrics: ToolExecutionMetrics;
  health: ToolHealth;
  executionHistory: ToolExecution[];
  lastExecution: string;
  createdAt: string;
}

export const TOOL_CATEGORY_LABELS: Record<ToolCategory, string> = {
  math: "Math",
  network: "Network",
  filesystem: "Filesystem",
};

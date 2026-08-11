import {
  Calculator,
  FileText,
  FilePen,
  Globe,
  Search,
  type LucideIcon,
} from "lucide-react";
import type { Agent } from "@/types/agent";

const TOOL_ICONS: Record<string, LucideIcon> = {
  calculator: Calculator,
  web_search: Search,
  file_reader: FileText,
  file_writer: FilePen,
  http_client: Globe,
};

function tool(slug: keyof typeof TOOL_ICONS, name: string) {
  return { id: `tool-${slug}`, slug, name, icon: TOOL_ICONS[slug] };
}

export const agents: Agent[] = [
  {
    id: "agent-planner",
    name: "Planner Agent",
    description:
      "Breaks incoming goals into ordered, executable steps and assigns each step to the right specialist agent.",
    role: "planner",
    status: "healthy",
    capabilities: [
      { id: "cap-decomposition", name: "Task decomposition", description: "Splits a goal into ordered subtasks." },
      { id: "cap-delegation", name: "Agent delegation", description: "Routes subtasks to capable agents." },
      { id: "cap-replanning", name: "Adaptive replanning", description: "Revises the plan when a step fails." },
    ],
    tools: [tool("calculator", "Calculator"), tool("file_writer", "File Writer")],
    workflows: [
      { id: "wf-quarterly-report", name: "Quarterly report generation", stage: "Planning stage", status: "active" },
      { id: "wf-onboarding", name: "Customer onboarding", stage: "Planning stage", status: "completed" },
    ],
    memory: {
      workingMemoryItems: 6,
      sessionMemoryItems: 24,
      knowledgeItems: 12,
      usagePercent: 38,
      recentActivity: [
        { id: "act-1", summary: "Stored plan for \"Summarize quarterly report\"", timestamp: "2 minutes ago" },
        { id: "act-2", summary: "Cleared completed subtask from working memory", timestamp: "18 minutes ago" },
      ],
    },
    knowledge: {
      entries: 12,
      lastUpdated: "1 hour ago",
      topContribution: "Task decomposition heuristics",
    },
    metrics: { successRate: 98, avgExecutionTime: "1.4s", totalExecutions: 482 },
    executionHistory: [
      { id: "exec-1", task: "Plan: Summarize quarterly report", status: "completed", duration: "1.1s", timestamp: "2 minutes ago" },
      { id: "exec-2", task: "Plan: Research AI startups", status: "completed", duration: "1.6s", timestamp: "1 hour ago" },
      { id: "exec-3", task: "Plan: Draft stakeholder email", status: "failed", duration: "0.8s", timestamp: "41 minutes ago" },
    ],
    createdAt: "2025-11-02",
    lastActive: "2 minutes ago",
  },
  {
    id: "agent-research",
    name: "Research Agent",
    description:
      "Gathers information from the web and internal knowledge sources to answer open-ended research questions.",
    role: "researcher",
    status: "running",
    capabilities: [
      { id: "cap-web-research", name: "Web research", description: "Finds and synthesizes information from the web." },
      { id: "cap-summarization", name: "Summarization", description: "Condenses long sources into key findings." },
      { id: "cap-citation", name: "Source citation", description: "Tracks and attributes every claim to a source." },
    ],
    tools: [tool("web_search", "Web Search"), tool("http_client", "HTTP Client"), tool("file_reader", "File Reader")],
    workflows: [
      { id: "wf-startup-scan", name: "AI startup landscape scan", stage: "Research stage", status: "active" },
    ],
    memory: {
      workingMemoryItems: 14,
      sessionMemoryItems: 51,
      knowledgeItems: 38,
      usagePercent: 64,
      recentActivity: [
        { id: "act-3", summary: "Fetched 6 sources on \"agentic AI funding\"", timestamp: "1 minute ago" },
        { id: "act-4", summary: "Wrote research summary to knowledge base", timestamp: "12 minutes ago" },
      ],
    },
    knowledge: {
      entries: 38,
      lastUpdated: "12 minutes ago",
      topContribution: "AI startup landscape 2026",
    },
    metrics: { successRate: 94, avgExecutionTime: "5.2s", totalExecutions: 311 },
    executionHistory: [
      { id: "exec-4", task: "Research AI startups", status: "running", duration: "32s", timestamp: "1 minute ago" },
      { id: "exec-5", task: "Explain Agentic AI", status: "completed", duration: "4.8s", timestamp: "9 minutes ago" },
      { id: "exec-6", task: "Compare vector database providers", status: "completed", duration: "6.5s", timestamp: "3 hours ago" },
    ],
    createdAt: "2025-11-02",
    lastActive: "1 minute ago",
  },
  {
    id: "agent-execution",
    name: "Execution Agent",
    description:
      "Carries out concrete actions — calculations, file operations, and API calls — dispatched by the Planner.",
    role: "executor",
    status: "healthy",
    capabilities: [
      { id: "cap-tool-use", name: "Tool execution", description: "Invokes registered tools with validated inputs." },
      { id: "cap-error-handling", name: "Error recovery", description: "Retries or escalates failed tool calls." },
    ],
    tools: [tool("calculator", "Calculator"), tool("file_writer", "File Writer"), tool("http_client", "HTTP Client")],
    workflows: [
      { id: "wf-quarterly-report", name: "Quarterly report generation", stage: "Execution stage", status: "active" },
      { id: "wf-invoice-processing", name: "Invoice processing", stage: "Execution stage", status: "paused" },
    ],
    memory: {
      workingMemoryItems: 3,
      sessionMemoryItems: 19,
      knowledgeItems: 4,
      usagePercent: 22,
      recentActivity: [
        { id: "act-5", summary: "Executed calculator step for \"25% of 800\"", timestamp: "2 minutes ago" },
      ],
    },
    knowledge: {
      entries: 4,
      lastUpdated: "3 days ago",
      topContribution: "Tool retry heuristics",
    },
    metrics: { successRate: 99, avgExecutionTime: "0.9s", totalExecutions: 967 },
    executionHistory: [
      { id: "exec-7", task: "Calculate 25% of 800", status: "completed", duration: "1.2s", timestamp: "2 minutes ago" },
      { id: "exec-8", task: "Fetch latest stock price", status: "completed", duration: "0.9s", timestamp: "1 hour ago" },
      { id: "exec-9", task: "Write summary to report.md", status: "completed", duration: "0.6s", timestamp: "2 hours ago" },
    ],
    createdAt: "2025-10-18",
    lastActive: "2 minutes ago",
  },
  {
    id: "agent-monitoring",
    name: "Monitoring Agent",
    description:
      "Watches running workflows and agent health, flagging anomalies before they become failures.",
    role: "monitor",
    status: "idle",
    capabilities: [
      { id: "cap-anomaly", name: "Anomaly detection", description: "Flags unusual latency or error rates." },
      { id: "cap-alerting", name: "Alerting", description: "Notifies operators of degraded subsystems." },
    ],
    tools: [tool("http_client", "HTTP Client")],
    workflows: [
      { id: "wf-fleet-watch", name: "Fleet health watch", stage: "Monitoring stage", status: "active" },
    ],
    memory: {
      workingMemoryItems: 1,
      sessionMemoryItems: 8,
      knowledgeItems: 2,
      usagePercent: 9,
      recentActivity: [
        { id: "act-6", summary: "No anomalies detected in last sweep", timestamp: "6 minutes ago" },
      ],
    },
    knowledge: {
      entries: 2,
      lastUpdated: "1 week ago",
      topContribution: "Baseline latency thresholds",
    },
    metrics: { successRate: 100, avgExecutionTime: "0.4s", totalExecutions: 1204 },
    executionHistory: [
      { id: "exec-10", task: "Sweep: fleet health check", status: "completed", duration: "0.4s", timestamp: "6 minutes ago" },
      { id: "exec-11", task: "Sweep: fleet health check", status: "completed", duration: "0.3s", timestamp: "21 minutes ago" },
    ],
    createdAt: "2025-10-18",
    lastActive: "6 minutes ago",
  },
  {
    id: "agent-knowledge",
    name: "Knowledge Agent",
    description:
      "Curates and indexes what every other agent learns, keeping the shared knowledge base current and searchable.",
    role: "knowledge",
    status: "failed",
    capabilities: [
      { id: "cap-indexing", name: "Indexing", description: "Embeds and indexes new knowledge entries." },
      { id: "cap-dedup", name: "Deduplication", description: "Merges overlapping knowledge entries." },
    ],
    tools: [tool("file_reader", "File Reader"), tool("file_writer", "File Writer")],
    workflows: [
      { id: "wf-kb-sync", name: "Knowledge base sync", stage: "Indexing stage", status: "paused" },
    ],
    memory: {
      workingMemoryItems: 2,
      sessionMemoryItems: 11,
      knowledgeItems: 87,
      usagePercent: 71,
      recentActivity: [
        { id: "act-7", summary: "Indexing failed: malformed source document", timestamp: "18 minutes ago" },
      ],
    },
    knowledge: {
      entries: 87,
      lastUpdated: "18 minutes ago",
      topContribution: "Vector database indexing strategies",
    },
    metrics: { successRate: 87, avgExecutionTime: "2.3s", totalExecutions: 156 },
    executionHistory: [
      { id: "exec-12", task: "Index: quarterly report sources", status: "failed", duration: "2.1s", timestamp: "18 minutes ago" },
      { id: "exec-13", task: "Index: startup research findings", status: "completed", duration: "1.9s", timestamp: "2 hours ago" },
    ],
    createdAt: "2025-11-14",
    lastActive: "18 minutes ago",
  },
];

import type { LucideIcon } from "lucide-react";
import {
  ListTree,
  Cpu,
  BrainCircuit,
  BookOpen,
  RefreshCcw,
  Wrench,
  Calculator,
  FileText,
  FilePen,
  Globe,
  Search,
  Bot,
  Workflow,
} from "lucide-react";

export type SystemStatus = "healthy" | "degraded" | "down";
export type RunStatus = "completed" | "running" | "failed";

/* ---------------------------------------------------------------------- */
/* Section 1 — System Health                                              */
/* ---------------------------------------------------------------------- */

export interface SystemHealthCard {
  id: string;
  title: string;
  description: string;
  status: SystemStatus;
  icon: LucideIcon;
}

export const systemHealth: SystemHealthCard[] = [
  {
    id: "planner",
    title: "Planner",
    description: "Breaks goals into ordered, executable steps.",
    status: "healthy",
    icon: ListTree,
  },
  {
    id: "runtime",
    title: "Runtime Engine",
    description: "Executes agent steps and manages concurrency.",
    status: "healthy",
    icon: Cpu,
  },
  {
    id: "memory",
    title: "Memory",
    description: "Session and long-term recall across runs.",
    status: "healthy",
    icon: BrainCircuit,
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    description: "Indexed documents and reference sources.",
    status: "healthy",
    icon: BookOpen,
  },
  {
    id: "reflection",
    title: "Reflection Engine",
    description: "Evaluates outcomes and refines future plans.",
    status: "healthy",
    icon: RefreshCcw,
  },
  {
    id: "tool-registry",
    title: "Tool Registry",
    description: "Available tools agents can call at runtime.",
    status: "healthy",
    icon: Wrench,
  },
];

/* ---------------------------------------------------------------------- */
/* Section 2 — Execution Pipeline                                         */
/* ---------------------------------------------------------------------- */

export interface PipelineStage {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const pipelineStages: PipelineStage[] = [
  { id: "planner", label: "Planner", icon: ListTree },
  { id: "tool-selection", label: "Tool Selection", icon: Wrench },
  { id: "execution", label: "Execution", icon: Cpu },
  { id: "reflection", label: "Reflection", icon: RefreshCcw },
  { id: "knowledge", label: "Knowledge", icon: BookOpen },
];

export const activePipelineStageId = "execution";

/* ---------------------------------------------------------------------- */
/* Section 3 — Tool Registry Overview                                     */
/* ---------------------------------------------------------------------- */

export interface ToolCard {
  id: string;
  title: string;
  category: string;
  description: string;
  status: SystemStatus;
  icon: LucideIcon;
}

export const toolRegistry: ToolCard[] = [
  {
    id: "calculator",
    title: "Calculator",
    category: "Computation",
    description: "Evaluates arithmetic and numeric expressions.",
    status: "healthy",
    icon: Calculator,
  },
  {
    id: "file-reader",
    title: "File Reader",
    category: "File System",
    description: "Reads text, CSV, and document contents.",
    status: "healthy",
    icon: FileText,
  },
  {
    id: "file-writer",
    title: "File Writer",
    category: "File System",
    description: "Writes and updates files during a run.",
    status: "healthy",
    icon: FilePen,
  },
  {
    id: "http-client",
    title: "HTTP Client",
    category: "Network",
    description: "Calls external APIs and web services.",
    status: "healthy",
    icon: Globe,
  },
  {
    id: "web-search",
    title: "Web Search",
    category: "Research",
    description: "Retrieves live results from the web.",
    status: "healthy",
    icon: Search,
  },
];

/* ---------------------------------------------------------------------- */
/* Section 4 — Recent Executions                                          */
/* ---------------------------------------------------------------------- */

export interface ExecutionRow {
  id: string;
  goal: string;
  status: RunStatus;
  duration: string;
  startedAt: string;
  result: string;
}

export const recentExecutions: ExecutionRow[] = [
  {
    id: "run-1",
    goal: "Calculate 25% of 800",
    status: "completed",
    duration: "1.2s",
    startedAt: "2 minutes ago",
    result: "200",
  },
  {
    id: "run-2",
    goal: "Explain Agentic AI",
    status: "completed",
    duration: "4.8s",
    startedAt: "9 minutes ago",
    result: "Summary delivered",
  },
  {
    id: "run-3",
    goal: "Research AI startups",
    status: "running",
    duration: "32s",
    startedAt: "1 minute ago",
    result: "In progress",
  },
  {
    id: "run-4",
    goal: "Summarize quarterly report",
    status: "completed",
    duration: "6.1s",
    startedAt: "24 minutes ago",
    result: "Summary delivered",
  },
  {
    id: "run-5",
    goal: "Draft email to stakeholders",
    status: "failed",
    duration: "2.4s",
    startedAt: "41 minutes ago",
    result: "Tool timeout",
  },
  {
    id: "run-6",
    goal: "Fetch latest stock price",
    status: "completed",
    duration: "0.9s",
    startedAt: "1 hour ago",
    result: "AAPL $231.42",
  },
];

/* ---------------------------------------------------------------------- */
/* Section 5 — Memory Summary                                             */
/* ---------------------------------------------------------------------- */

export const memorySummary = {
  sessionMemories: 128,
  longTermMemories: 342,
  knowledgeEntries: 87,
  experienceRecords: 214,
};

/* ---------------------------------------------------------------------- */
/* Section 6 — Knowledge Base Summary                                     */
/* ---------------------------------------------------------------------- */

export const knowledgeBaseSummary = {
  recentlyLearned: "Vector database indexing strategies",
  mostAccessedTopic: "Agent orchestration patterns",
  lastUpdated: "12 minutes ago",
};

/* ---------------------------------------------------------------------- */
/* Section 7 — Quick Actions                                              */
/* ---------------------------------------------------------------------- */

export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
}

export const quickActions: QuickAction[] = [
  {
    id: "create-agent",
    title: "Create Agent",
    description: "Configure a new autonomous agent.",
    icon: Bot,
    path: "/agents",
  },
  {
    id: "run-workflow",
    title: "Run Workflow",
    description: "Launch a multi-step agent workflow.",
    icon: Workflow,
    path: "/workflows",
  },
  {
    id: "inspect-memory",
    title: "Inspect Memory",
    description: "Review session and long-term recall.",
    icon: BrainCircuit,
    path: "/memory",
  },
  {
    id: "browse-tools",
    title: "Browse Tools",
    description: "See every tool available at runtime.",
    icon: Wrench,
    path: "/tools",
  },
  {
    id: "view-knowledge",
    title: "View Knowledge",
    description: "Explore indexed documents and sources.",
    icon: BookOpen,
    path: "/knowledge",
  },
];

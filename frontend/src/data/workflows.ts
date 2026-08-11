import { Calculator, FileText, FilePen, Globe, Search, type LucideIcon } from "lucide-react";
import type { AgentTool } from "@/types/agent";
import type { Workflow } from "@/types/workflow";

const TOOL_ICONS: Record<string, LucideIcon> = {
  calculator: Calculator,
  web_search: Search,
  file_reader: FileText,
  file_writer: FilePen,
  http_client: Globe,
};

function tool(slug: keyof typeof TOOL_ICONS, name: string): AgentTool {
  return { id: `tool-${slug}`, slug, name, icon: TOOL_ICONS[slug] };
}

export const workflows: Workflow[] = [
  {
    id: "wf-research-intelligence",
    name: "Research Intelligence Workflow",
    description:
      "Plans a research goal, gathers sources from the web, and distills findings into the shared knowledge base.",
    status: "active",
    category: "research",
    agents: [
      { agentId: "agent-planner", roleInWorkflow: "Breaks the goal into a research plan" },
      { agentId: "agent-research", roleInWorkflow: "Executes web research and synthesis" },
      { agentId: "agent-knowledge", roleInWorkflow: "Indexes findings into knowledge base" },
    ],
    steps: [
      { id: "step-1", name: "Planner Agent", type: "agent", agentId: "agent-planner", status: "completed", order: 1 },
      { id: "step-2", name: "Research Agent", type: "agent", agentId: "agent-research", status: "completed", order: 2 },
      { id: "step-3", name: "Web Search Tool", type: "tool", toolSlug: "web_search", status: "running", order: 3 },
      { id: "step-4", name: "Knowledge Extraction", type: "process", status: "pending", order: 4 },
      {
        id: "step-5",
        name: "Knowledge Storage",
        type: "agent",
        agentId: "agent-knowledge",
        status: "pending",
        order: 5,
        condition: "extraction.confidence > 0.75",
      },
    ],
    tools: [tool("web_search", "Web Search")],
    conditions: [
      {
        id: "cond-1",
        stepId: "step-5",
        stepName: "Knowledge Storage",
        rule: "extraction.confidence > 0.75",
        description: "Only store extracted knowledge above a 75% confidence threshold.",
      },
    ],
    executionMetrics: { totalRuns: 342, successfulRuns: 328, failedRuns: 14, avgDuration: "8.4s" },
    executionHistory: [
      { id: "run-4821", status: "running", duration: "18s", timestamp: "1 minute ago" },
      { id: "run-4820", status: "completed", duration: "7.9s", timestamp: "1 hour ago" },
      { id: "run-4819", status: "completed", duration: "9.1s", timestamp: "4 hours ago" },
      { id: "run-4818", status: "failed", duration: "3.2s", timestamp: "1 day ago" },
    ],
    lastExecution: "1 minute ago",
    createdAt: "2025-11-02",
  },
  {
    id: "wf-ticket-resolution",
    name: "Automated Ticket Resolution Workflow",
    description:
      "Analyzes an incoming support ticket, decides on a resolution path, and drafts a response automatically.",
    status: "active",
    category: "support",
    agents: [
      { agentId: "agent-monitoring", roleInWorkflow: "Analyzes incoming ticket signals" },
      { agentId: "agent-execution", roleInWorkflow: "Generates the customer-facing response" },
    ],
    steps: [
      { id: "step-1", name: "Ticket Analyzer", type: "process", status: "completed", order: 1 },
      {
        id: "step-2",
        name: "Decision Agent",
        type: "decision",
        agentId: "agent-monitoring",
        status: "completed",
        order: 2,
        condition: "ticket.priority == 'high'",
      },
      {
        id: "step-3",
        name: "Tool Execution",
        type: "tool",
        toolSlug: "http_client",
        status: "completed",
        order: 3,
        condition: "decision.action == 'auto_resolve'",
      },
      { id: "step-4", name: "Response Generator", type: "agent", agentId: "agent-execution", status: "completed", order: 4 },
    ],
    tools: [tool("http_client", "HTTP Client")],
    conditions: [
      {
        id: "cond-2",
        stepId: "step-2",
        stepName: "Decision Agent",
        rule: "ticket.priority == 'high'",
        description: "Route high-priority tickets to a manual review queue instead of continuing.",
      },
      {
        id: "cond-3",
        stepId: "step-3",
        stepName: "Tool Execution",
        rule: "decision.action == 'auto_resolve'",
        description: "Only call the resolution tool when the decision agent selects auto-resolve.",
      },
    ],
    executionMetrics: { totalRuns: 891, successfulRuns: 843, failedRuns: 48, avgDuration: "3.1s" },
    executionHistory: [
      { id: "run-9142", status: "completed", duration: "2.8s", timestamp: "3 minutes ago" },
      { id: "run-9141", status: "completed", duration: "3.4s", timestamp: "22 minutes ago" },
      { id: "run-9140", status: "failed", duration: "1.1s", timestamp: "48 minutes ago" },
      { id: "run-9139", status: "completed", duration: "3.0s", timestamp: "2 hours ago" },
    ],
    lastExecution: "3 minutes ago",
    createdAt: "2025-10-21",
  },
  {
    id: "wf-data-processing",
    name: "Data Processing Workflow",
    description:
      "Validates an incoming dataset, runs it through processing, and produces a clean output file.",
    status: "paused",
    category: "data-processing",
    agents: [{ agentId: "agent-execution", roleInWorkflow: "Runs the core processing step" }],
    steps: [
      { id: "step-1", name: "Input Validation", type: "process", status: "completed", order: 1 },
      {
        id: "step-2",
        name: "Processing Agent",
        type: "agent",
        agentId: "agent-execution",
        status: "pending",
        order: 2,
        condition: "input.isValid == true",
      },
      { id: "step-3", name: "Output Generation", type: "process", status: "pending", order: 3 },
    ],
    tools: [tool("file_reader", "File Reader"), tool("file_writer", "File Writer")],
    conditions: [
      {
        id: "cond-4",
        stepId: "step-2",
        stepName: "Processing Agent",
        rule: "input.isValid == true",
        description: "Skip processing entirely if input validation fails.",
      },
    ],
    executionMetrics: { totalRuns: 156, successfulRuns: 151, failedRuns: 5, avgDuration: "5.6s" },
    executionHistory: [
      { id: "run-2210", status: "completed", duration: "5.9s", timestamp: "6 hours ago" },
      { id: "run-2209", status: "completed", duration: "5.2s", timestamp: "1 day ago" },
      { id: "run-2208", status: "failed", duration: "2.0s", timestamp: "3 days ago" },
    ],
    lastExecution: "6 hours ago",
    createdAt: "2025-09-30",
  },
  {
    id: "wf-customer-onboarding",
    name: "Customer Onboarding Automation",
    description:
      "Provisions a new customer workspace and sends a welcome sequence with no manual steps.",
    status: "completed",
    category: "automation",
    agents: [
      { agentId: "agent-planner", roleInWorkflow: "Plans the provisioning sequence" },
      { agentId: "agent-execution", roleInWorkflow: "Provisions workspace resources" },
    ],
    steps: [
      { id: "step-1", name: "Planner Agent", type: "agent", agentId: "agent-planner", status: "completed", order: 1 },
      { id: "step-2", name: "Workspace Provisioning", type: "tool", toolSlug: "http_client", status: "completed", order: 2 },
      { id: "step-3", name: "Welcome Email", type: "tool", toolSlug: "file_writer", status: "completed", order: 3 },
    ],
    tools: [tool("http_client", "HTTP Client"), tool("file_writer", "File Writer")],
    conditions: [],
    executionMetrics: { totalRuns: 512, successfulRuns: 506, failedRuns: 6, avgDuration: "4.0s" },
    executionHistory: [
      { id: "run-7701", status: "completed", duration: "3.8s", timestamp: "2 days ago" },
      { id: "run-7700", status: "completed", duration: "4.3s", timestamp: "3 days ago" },
    ],
    lastExecution: "2 days ago",
    createdAt: "2025-08-14",
  },
  {
    id: "wf-invoice-reconciliation",
    name: "Invoice Reconciliation Workflow",
    description:
      "Cross-references incoming invoices against purchase orders and flags mismatches for review.",
    status: "failed",
    category: "data-processing",
    agents: [{ agentId: "agent-monitoring", roleInWorkflow: "Flags mismatches for review" }],
    steps: [
      { id: "step-1", name: "Input Validation", type: "process", status: "completed", order: 1 },
      { id: "step-2", name: "Calculator Tool", type: "tool", toolSlug: "calculator", status: "failed", order: 2 },
      { id: "step-3", name: "Mismatch Report", type: "agent", agentId: "agent-monitoring", status: "pending", order: 3 },
    ],
    tools: [tool("calculator", "Calculator")],
    conditions: [],
    executionMetrics: { totalRuns: 64, successfulRuns: 52, failedRuns: 12, avgDuration: "2.7s" },
    executionHistory: [
      { id: "run-3305", status: "failed", duration: "1.4s", timestamp: "41 minutes ago" },
      { id: "run-3304", status: "completed", duration: "2.9s", timestamp: "1 day ago" },
    ],
    lastExecution: "41 minutes ago",
    createdAt: "2025-11-20",
  },
];

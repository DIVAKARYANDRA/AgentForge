import { AgentToolsPanel } from "@/components/agents/AgentToolsPanel";
import type { AgentTool } from "@/types/agent";

interface WorkflowToolsPanelProps {
  tools: AgentTool[];
}

/**
 * Workflows and agents call the same tool registry, so this reuses
 * AgentToolsPanel's card layout rather than re-implementing it.
 */
export function WorkflowToolsPanel({ tools }: WorkflowToolsPanelProps) {
  return <AgentToolsPanel tools={tools} />;
}

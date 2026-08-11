import { AnimatePresence } from "framer-motion";
import { SearchX } from "lucide-react";
import { AgentCard } from "@/components/agents/AgentCard";
import type { Agent } from "@/types/agent";

interface AgentGridProps {
  agents: Agent[];
  onSelectAgent: (agentId: string) => void;
}

export function AgentGrid({ agents, onSelectAgent }: AgentGridProps) {
  if (agents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-16 text-center">
        <SearchX className="size-6 text-subtle-foreground" />
        <p className="text-sm font-medium text-foreground">No agents match your filters</p>
        <p className="text-xs text-muted-foreground">
          Try a different search term or clear the active filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AnimatePresence initial={false}>
        {agents.map((agent, i) => (
          <AgentCard key={agent.id} agent={agent} index={i} onSelect={onSelectAgent} />
        ))}
      </AnimatePresence>
    </div>
  );
}

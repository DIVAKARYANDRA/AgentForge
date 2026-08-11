import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { agents } from "@/data/agents";
import type { MemoryEntry } from "@/types/memory";

interface AgentMemoryPanelProps {
  entries: MemoryEntry[];
}

/**
 * Fleet-wide roster showing how memory is distributed across agents —
 * distinct from components/agents/AgentMemoryPanel.tsx, which shows one
 * agent's own memory snapshot inline in the Agent detail drawer. This one
 * reuses the Agent entities from Prompt 4 rather than duplicating them.
 */
export function AgentMemoryPanel({ entries }: AgentMemoryPanelProps) {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Agent Memory Relationship"
        description="How memory is distributed across your agent fleet."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => {
          const agentEntries = entries.filter((e) => e.agentId === agent.id);
          const recent = [...agentEntries]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 2);
          const knowledgeContributions = agentEntries.filter((e) => e.type === "knowledge").length;

          return (
            <Card key={agent.id} className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{agent.name}</p>
                <Badge variant="outline" className="normal-case">
                  {agentEntries.length} {agentEntries.length === 1 ? "memory" : "memories"}
                </Badge>
              </div>

              <div className="flex flex-col gap-1.5">
                {recent.length === 0 ? (
                  <p className="text-xs text-subtle-foreground">No recent memory activity.</p>
                ) : (
                  recent.map((entry) => (
                    <p key={entry.id} className="line-clamp-1 font-mono text-[11px] text-muted-foreground">
                      {entry.content}
                    </p>
                  ))
                )}
              </div>

              <p className="text-[11px] text-subtle-foreground">
                {knowledgeContributions} knowledge{" "}
                {knowledgeContributions === 1 ? "contribution" : "contributions"}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

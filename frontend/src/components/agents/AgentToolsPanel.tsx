import type { AgentTool } from "@/types/agent";

interface AgentToolsPanelProps {
  tools: AgentTool[];
}

export function AgentToolsPanel({ tools }: AgentToolsPanelProps) {
  if (tools.length === 0) {
    return <p className="text-xs text-subtle-foreground">No tools connected.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {tools.map((tool) => (
        <div
          key={tool.id}
          className="flex items-center gap-2 rounded-md border border-border bg-surface-2 px-2.5 py-2"
        >
          <tool.icon className="size-3.5 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-foreground">{tool.name}</p>
            <p className="truncate font-mono text-[10px] text-subtle-foreground">
              {tool.slug}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

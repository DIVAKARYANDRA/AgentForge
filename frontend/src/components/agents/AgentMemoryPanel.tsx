import type { AgentMemorySnapshot } from "@/types/agent";

interface AgentMemoryPanelProps {
  memory: AgentMemorySnapshot;
}

export function AgentMemoryPanel({ memory }: AgentMemoryPanelProps) {
  const stats = [
    { label: "Working memory", value: memory.workingMemoryItems },
    { label: "Session memory", value: memory.sessionMemoryItems },
    { label: "Knowledge items", value: memory.knowledgeItems },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-md border border-border bg-surface-2 p-2.5 text-center">
            <p className="font-mono text-base font-semibold tabular-nums text-foreground">
              {stat.value}
            </p>
            <p className="mt-0.5 text-[10px] text-subtle-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Memory usage</span>
          <span className="font-mono text-foreground">{memory.usagePercent}%</span>
        </div>
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${memory.usagePercent}%` }}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Recent activity</p>
        <ul className="flex flex-col gap-2">
          {memory.recentActivity.map((activity) => (
            <li key={activity.id} className="flex items-start gap-2 text-xs">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-subtle-foreground" />
              <span className="text-muted-foreground">
                {activity.summary}
                <span className="ml-1.5 text-subtle-foreground">· {activity.timestamp}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

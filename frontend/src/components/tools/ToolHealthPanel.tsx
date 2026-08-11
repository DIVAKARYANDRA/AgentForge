import { StatusBadge } from "@/components/common/StatusBadge";
import type { ToolHealth } from "@/types/tool";

interface ToolHealthPanelProps {
  health: ToolHealth;
}

export function ToolHealthPanel({ health }: ToolHealthPanelProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between rounded-md border border-border bg-surface-2 px-3 py-2.5">
        <span className="text-xs text-muted-foreground">Health state</span>
        <StatusBadge status={health.status} />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md border border-border bg-surface-2 p-2.5 text-center">
          <p className="text-xs font-medium text-foreground">{health.lastCheck}</p>
          <p className="mt-0.5 text-[10px] text-subtle-foreground">Last check</p>
        </div>
        <div className="rounded-md border border-border bg-surface-2 p-2.5 text-center">
          <p className="font-mono text-xs font-medium tabular-nums text-foreground">
            {health.availability}%
          </p>
          <p className="mt-0.5 text-[10px] text-subtle-foreground">Availability</p>
        </div>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
        <div
          className="h-full rounded-full bg-success"
          style={{ width: `${health.availability}%` }}
        />
      </div>
    </div>
  );
}

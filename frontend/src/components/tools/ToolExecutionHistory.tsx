import { StatusBadge } from "@/components/common/StatusBadge";
import type { ToolExecution } from "@/types/tool";

interface ToolExecutionHistoryProps {
  history: ToolExecution[];
}

export function ToolExecutionHistory({ history }: ToolExecutionHistoryProps) {
  if (history.length === 0) {
    return <p className="text-xs text-subtle-foreground">No executions recorded yet.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-[480px] border-collapse text-xs">
        <thead>
          <tr className="border-b border-border bg-surface-2 text-left">
            <th className="px-3 py-2 font-medium uppercase tracking-wide text-subtle-foreground">
              Task
            </th>
            <th className="px-3 py-2 font-medium uppercase tracking-wide text-subtle-foreground">
              Agent
            </th>
            <th className="px-3 py-2 font-medium uppercase tracking-wide text-subtle-foreground">
              Workflow
            </th>
            <th className="px-3 py-2 font-medium uppercase tracking-wide text-subtle-foreground">
              Status
            </th>
            <th className="px-3 py-2 font-medium uppercase tracking-wide text-subtle-foreground">
              Duration
            </th>
            <th className="px-3 py-2 font-medium uppercase tracking-wide text-subtle-foreground">
              Timestamp
            </th>
          </tr>
        </thead>
        <tbody>
          {history.map((record) => (
            <tr key={record.id} className="border-b border-border last:border-b-0">
              <td className="px-3 py-2.5 font-medium text-foreground">{record.task}</td>
              <td className="px-3 py-2.5 text-muted-foreground">{record.agent}</td>
              <td className="px-3 py-2.5 text-muted-foreground">{record.workflow ?? "—"}</td>
              <td className="px-3 py-2.5">
                <StatusBadge status={record.status} />
              </td>
              <td className="px-3 py-2.5 font-mono text-muted-foreground tabular-nums">
                {record.duration}
              </td>
              <td className="px-3 py-2.5 text-muted-foreground">{record.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

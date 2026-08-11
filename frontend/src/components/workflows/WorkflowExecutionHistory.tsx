import { StatusBadge } from "@/components/common/StatusBadge";
import type { WorkflowExecutionRecord } from "@/types/workflow";

interface WorkflowExecutionHistoryProps {
  history: WorkflowExecutionRecord[];
}

export function WorkflowExecutionHistory({ history }: WorkflowExecutionHistoryProps) {
  if (history.length === 0) {
    return <p className="text-xs text-subtle-foreground">No runs recorded yet.</p>;
  }

  return (
    <div className="overflow-hidden rounded-md border border-border">
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr className="border-b border-border bg-surface-2 text-left">
            <th className="px-3 py-2 font-medium uppercase tracking-wide text-subtle-foreground">
              Run ID
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
              <td className="px-3 py-2.5 font-mono font-medium text-foreground">
                {record.id}
              </td>
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

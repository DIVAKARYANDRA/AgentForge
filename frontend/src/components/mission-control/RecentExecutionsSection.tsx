import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { recentExecutions } from "@/data/mission-control";

export function RecentExecutionsSection() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Recent Executions"
        description="The latest agent runs across your workspace."
      />

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-medium text-subtle-foreground text-xs uppercase tracking-wide">
                  Goal
                </th>
                <th className="px-4 py-3 font-medium text-subtle-foreground text-xs uppercase tracking-wide">
                  Status
                </th>
                <th className="px-4 py-3 font-medium text-subtle-foreground text-xs uppercase tracking-wide">
                  Duration
                </th>
                <th className="px-4 py-3 font-medium text-subtle-foreground text-xs uppercase tracking-wide">
                  Started
                </th>
                <th className="px-4 py-3 font-medium text-subtle-foreground text-xs uppercase tracking-wide">
                  Result
                </th>
              </tr>
            </thead>
            <tbody>
              {recentExecutions.map((row, i) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.2, delay: i * 0.03, ease: "easeOut" }}
                  className="border-b border-border last:border-b-0 transition-colors hover:bg-surface-2"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {row.goal}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground tabular-nums">
                    {row.duration}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.startedAt}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                      {row.status === "failed" ? (
                        <XCircle className="size-3.5 shrink-0 text-destructive" />
                      ) : row.status === "completed" ? (
                        <CheckCircle2 className="size-3.5 shrink-0 text-success" />
                      ) : null}
                      <span className="truncate">{row.result}</span>
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
}

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { MemoryEntry, MemoryType } from "@/types/memory";

interface MemoryTypeCardProps {
  type: MemoryType;
  label: string;
  icon: LucideIcon;
  entries: MemoryEntry[];
  active: boolean;
  onToggle: (type: MemoryType) => void;
  index: number;
}

export function MemoryTypeCard({
  type,
  label,
  icon: Icon,
  entries,
  active,
  onToggle,
  index,
}: MemoryTypeCardProps) {
  const mostRecent = [...entries].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  )[0];
  const lastEvent = mostRecent?.history[mostRecent.history.length - 1];
  const associatedAgents = Array.from(new Set(entries.map((e) => e.agentName)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -2 }}
    >
      <Card
        role="button"
        tabIndex={0}
        aria-pressed={active}
        aria-label={`Filter by ${label}`}
        onClick={() => onToggle(type)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(type);
          }
        }}
        className={cn(
          "flex h-full cursor-pointer flex-col gap-3 p-4 transition-colors",
          active
            ? "border-primary/60 bg-primary-muted/40"
            : "hover:border-border-strong hover:bg-surface-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-md",
              active ? "bg-primary text-primary-foreground" : "bg-surface-2 text-muted-foreground"
            )}
          >
            <Icon className="size-4" />
          </div>
          <StatusBadge status="healthy" />
        </div>

        <div>
          <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">
            {entries.length}
          </p>
          <p className="mt-0.5 text-xs font-medium text-foreground">{label}</p>
        </div>

        <p className="text-[11px] text-muted-foreground">
          {lastEvent ? `${lastEvent.description}` : "No recent activity"}
        </p>

        <p className="truncate text-[11px] text-subtle-foreground">
          {associatedAgents.length > 0
            ? associatedAgents.join(", ")
            : "No associated agents"}
        </p>
      </Card>
    </motion.div>
  );
}

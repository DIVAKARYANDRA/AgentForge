import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MEMORY_IMPORTANCE_LABELS, MEMORY_TYPE_SHORT_LABELS, type MemoryEntry } from "@/types/memory";

interface MemoryEntryCardProps {
  entry: MemoryEntry;
  index: number;
  onSelect: (entryId: string) => void;
}

const IMPORTANCE_DOT: Record<MemoryEntry["importance"], string> = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-subtle-foreground",
};

export function MemoryEntryCard({ entry, index, onSelect }: MemoryEntryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index, 10) * 0.03, ease: "easeOut" }}
      layout
    >
      <Card
        role="button"
        tabIndex={0}
        aria-label={`View details for memory entry: ${entry.content}`}
        onClick={() => onSelect(entry.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(entry.id);
          }
        }}
        className={cn(
          "flex cursor-pointer flex-col gap-2 p-3.5 transition-colors",
          "hover:border-primary/50 hover:bg-surface-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="normal-case">
              {MEMORY_TYPE_SHORT_LABELS[entry.type]}
            </Badge>
            <span className="text-xs text-subtle-foreground">{entry.agentName}</span>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] text-subtle-foreground">
            <span className={cn("size-1.5 rounded-full", IMPORTANCE_DOT[entry.importance])} />
            {MEMORY_IMPORTANCE_LABELS[entry.importance]}
          </span>
        </div>

        <p className="line-clamp-2 font-mono text-xs leading-relaxed text-foreground">
          {entry.content}
        </p>

        <p className="text-[11px] text-subtle-foreground">
          {entry.history[0]?.timestamp ?? "Unknown time"}
        </p>
      </Card>
    </motion.div>
  );
}

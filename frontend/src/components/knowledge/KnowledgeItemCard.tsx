import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { confidenceLevel, type KnowledgeItem } from "@/types/knowledge";

interface KnowledgeItemCardProps {
  item: KnowledgeItem;
  index: number;
  onSelect: (itemId: string) => void;
}

const CONFIDENCE_COLOR: Record<ReturnType<typeof confidenceLevel>, string> = {
  high: "text-success",
  medium: "text-warning",
  low: "text-subtle-foreground",
};

function titleCase(value: string): string {
  return value
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

export function KnowledgeItemCard({ item, index, onSelect }: KnowledgeItemCardProps) {
  const level = confidenceLevel(item.confidence);

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
        aria-label={`View details for ${item.title}`}
        onClick={() => onSelect(item.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(item.id);
          }
        }}
        className={cn(
          "flex cursor-pointer flex-col gap-2.5 p-4 transition-colors",
          "hover:border-primary/50 hover:bg-surface-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-foreground">{item.title}</p>
          <span className={cn("shrink-0 font-mono text-xs font-medium tabular-nums", CONFIDENCE_COLOR[level])}>
            {item.confidence}%
          </span>
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {item.summary}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <Badge variant="outline" className="normal-case">
            {titleCase(item.category)}
          </Badge>
          <span className="text-[11px] text-subtle-foreground">{item.sourceAgentName}</span>
        </div>

        <p className="text-[11px] text-subtle-foreground">Added {item.createdAt}</p>
      </Card>
    </motion.div>
  );
}

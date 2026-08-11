import { motion } from "framer-motion";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import type { KnowledgeItem } from "@/types/knowledge";

interface KnowledgeOverviewProps {
  items: KnowledgeItem[];
  activeCategories: string[];
  onToggleCategory: (category: string) => void;
}

function titleCase(value: string): string {
  return value
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
}

export function KnowledgeOverview({ items, activeCategories, onToggleCategory }: KnowledgeOverviewProps) {
  const categories = Array.from(new Set(items.map((i) => i.category)));

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Categories"
        description="Select a category to filter the explorer below."
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, i) => {
          const categoryItems = items.filter((item) => item.category === category);
          const avgConfidence = Math.round(
            categoryItems.reduce((sum, item) => sum + item.confidence, 0) / categoryItems.length
          );
          const active = activeCategories.includes(category);

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.05, ease: "easeOut" }}
              whileHover={{ y: -2 }}
            >
              <Card
                role="button"
                tabIndex={0}
                aria-pressed={active}
                aria-label={`Filter by ${titleCase(category)} category`}
                onClick={() => onToggleCategory(category)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggleCategory(category);
                  }
                }}
                className={cn(
                  "flex cursor-pointer flex-col gap-2 p-3.5 transition-colors",
                  active
                    ? "border-primary/60 bg-primary-muted/40"
                    : "hover:border-border-strong hover:bg-surface-2",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                <div className="flex items-center gap-1.5 text-subtle-foreground">
                  <Tag className="size-3" />
                  <span className="text-[11px]">{titleCase(category)}</span>
                </div>
                <p className="font-mono text-lg font-semibold tabular-nums text-foreground">
                  {categoryItems.length}
                </p>
                <p className="text-[10px] text-subtle-foreground">
                  {avgConfidence}% avg confidence
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

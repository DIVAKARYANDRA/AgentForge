import { motion } from "framer-motion";
import { PlayCircle, Database, Sparkles, ArrowUpCircle, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";

interface TimelineStage {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const STAGES: TimelineStage[] = [
  { id: "task", label: "Task Executed", description: "An agent completes a step in a run.", icon: PlayCircle },
  { id: "created", label: "Memory Created", description: "The result is stored as working or session memory.", icon: Database },
  { id: "extracted", label: "Experience Extracted", description: "The Reflection Engine identifies a reusable pattern.", icon: Sparkles },
  { id: "promoted", label: "Knowledge Promoted", description: "The pattern graduates into shared knowledge memory.", icon: ArrowUpCircle },
];

/**
 * Illustrates the general path from a single task execution to promoted,
 * shareable knowledge — not tied to any one memory entry. Individual
 * entries' own lifecycle events live in MemoryDetailDrawer's History
 * section instead.
 */
export function MemoryTimeline() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Memory Lifecycle"
        description="How a single execution becomes durable, shared knowledge."
      />

      <Card className="overflow-x-auto p-5">
        <div className="flex min-w-[640px] items-start sm:min-w-0">
          {STAGES.map((stage, i) => (
            <div key={stage.id} className="flex flex-1 items-start">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.3, delay: i * 0.15, ease: "easeOut" }}
                className="flex flex-1 flex-col items-center gap-2.5 text-center"
              >
                <div className="flex size-11 items-center justify-center rounded-full border border-border bg-surface-2 text-muted-foreground">
                  <stage.icon className="size-4" />
                </div>
                <div className="max-w-[9rem]">
                  <p className="text-xs font-medium text-foreground">{stage.label}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-subtle-foreground">
                    {stage.description}
                  </p>
                </div>
              </motion.div>

              {i < STAGES.length - 1 && (
                <div className="mx-1 mt-5 hidden h-px flex-1 bg-border sm:block sm:mx-2" />
              )}
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}

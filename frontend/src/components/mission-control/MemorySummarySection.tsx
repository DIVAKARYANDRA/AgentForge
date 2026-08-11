import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import { memorySummary } from "@/data/mission-control";

const stats: { label: string; value: number }[] = [
  { label: "Session Memories", value: memorySummary.sessionMemories },
  { label: "Long-term Memories", value: memorySummary.longTermMemories },
  { label: "Knowledge Entries", value: memorySummary.knowledgeEntries },
  { label: "Experience Records", value: memorySummary.experienceRecords },
];

export function MemorySummarySection() {
  return (
    <section className="flex h-full flex-col gap-4">
      <SectionHeader title="Memory Summary" />

      <Card className="flex-1 p-5">
        <div className="grid grid-cols-2 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.25, delay: i * 0.04, ease: "easeOut" }}
            >
              <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">
                {stat.value.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </section>
  );
}

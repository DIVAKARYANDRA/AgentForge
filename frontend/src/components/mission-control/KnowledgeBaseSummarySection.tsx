import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { knowledgeBaseSummary } from "@/data/mission-control";

const rows: { label: string; value: string }[] = [
  { label: "Recently Learned", value: knowledgeBaseSummary.recentlyLearned },
  { label: "Most Accessed Topic", value: knowledgeBaseSummary.mostAccessedTopic },
  { label: "Last Updated", value: knowledgeBaseSummary.lastUpdated },
];

export function KnowledgeBaseSummarySection() {
  return (
    <section className="flex h-full flex-col gap-4">
      <SectionHeader title="Knowledge Base" />

      <Card className="flex-1 p-5">
        <div className="flex flex-col">
          {rows.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.25, delay: i * 0.05, ease: "easeOut" }}
            >
              {i > 0 && <Separator className="my-3" />}
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-muted-foreground">{row.label}</p>
                <p className="max-w-[60%] truncate text-right text-sm font-medium text-foreground">
                  {row.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </section>
  );
}

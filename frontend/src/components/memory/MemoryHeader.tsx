import { motion } from "framer-motion";
import { DemoDataBadge } from "@/components/common/DemoDataBadge";
import { MemoryMetrics } from "@/components/memory/MemoryMetrics";

interface MemoryHeaderProps {
  totalMemories: number;
  workingCount: number;
  sessionCount: number;
  knowledgeCount: number;
}

export function MemoryHeader({
  totalMemories,
  workingCount,
  sessionCount,
  knowledgeCount,
}: MemoryHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-6 border-b border-border pb-8"
    >
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Memory
          </h1>
          <DemoDataBadge />
        </div>
        <p className="mt-1.5 max-w-lg text-sm text-muted-foreground sm:text-base">
          Inspect agent memory, execution context, and learned information.
        </p>
      </div>

      <MemoryMetrics
        totalMemories={totalMemories}
        workingCount={workingCount}
        sessionCount={sessionCount}
        knowledgeCount={knowledgeCount}
      />
    </motion.div>
  );
}

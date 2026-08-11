import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { systemHealth } from "@/data/mission-control";

export function SystemHealthSection() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="System Health"
        description="Live status of every core subsystem."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {systemHealth.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.25, delay: i * 0.04, ease: "easeOut" }}
            whileHover={{ y: -2 }}
          >
            <Card className="flex h-full flex-col gap-3 p-4 transition-colors hover:border-border-strong">
              <div className="flex items-start justify-between">
                <div className="flex size-9 items-center justify-center rounded-md bg-surface-2 text-muted-foreground">
                  <item.icon className="size-4" />
                </div>
                <StatusBadge status={item.status} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

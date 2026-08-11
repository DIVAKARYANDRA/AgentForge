import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { toolRegistry } from "@/data/mission-control";

export function ToolRegistrySection() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Tool Registry"
        description="Tools available to agents at runtime."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {toolRegistry.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.25, delay: i * 0.04, ease: "easeOut" }}
            whileHover={{ y: -2 }}
          >
            <Card className="flex h-full flex-col gap-3 p-4 transition-colors hover:border-border-strong">
              <div className="flex items-start justify-between">
                <div className="flex size-9 items-center justify-center rounded-md bg-surface-2 text-muted-foreground">
                  <tool.icon className="size-4" />
                </div>
                <StatusBadge status={tool.status} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{tool.title}</p>
                </div>
                <Badge variant="outline" className="mt-1.5 normal-case">
                  {tool.category}
                </Badge>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

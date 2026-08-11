import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import { quickActions } from "@/data/mission-control";

export function QuickActionsSection() {
  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Quick Actions"
        description="Jump straight into the most common tasks."
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {quickActions.map((action, i) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.25, delay: i * 0.04, ease: "easeOut" }}
            whileHover={{ y: -3 }}
          >
            <Link to={action.path} className="block h-full">
              <Card className="group flex h-full flex-col gap-3 p-4 transition-colors hover:border-primary/50 hover:bg-surface-2">
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-md bg-primary-muted text-primary-hover">
                    <action.icon className="size-4" />
                  </div>
                  <ArrowUpRight className="size-4 text-subtle-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {action.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {action.description}
                  </p>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

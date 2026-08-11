import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export function SettingsHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col justify-between gap-4 border-b border-border pb-8 sm:flex-row sm:items-end"
    >
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1.5 max-w-lg text-sm text-muted-foreground sm:text-base">
          Configure your AI workspace, runtime behavior, and application preferences.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="normal-case font-mono">
          AgentForge v1.0
        </Badge>
        <Badge variant="warning" className="normal-case">
          Development
        </Badge>
      </div>
    </motion.div>
  );
}

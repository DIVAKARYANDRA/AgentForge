import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface SettingsSectionProps {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
}

export function SettingsSection({ id, title, description, icon: Icon, children }: SettingsSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-heading`}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="scroll-mt-20 flex flex-col gap-4"
    >
      <div className="flex items-center gap-2.5 border-b border-border pb-3">
        {Icon && (
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-surface-2 text-muted-foreground">
            <Icon className="size-3.5" />
          </div>
        )}
        <div>
          <h2 id={`${id}-heading`} className="text-sm font-medium text-foreground">
            {title}
          </h2>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {children}
    </motion.section>
  );
}

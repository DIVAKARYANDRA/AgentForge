import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface SettingsFooterProps {
  isDirty: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onRestoreDefaults: () => void;
}

export function SettingsFooter({ isDirty, onSave, onDiscard, onRestoreDefaults }: SettingsFooterProps) {
  return (
    <AnimatePresence>
      {isDirty && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="glass glass-border sticky bottom-4 z-10 mt-2 flex flex-col items-start justify-between gap-3 rounded-lg border p-3.5 sm:flex-row sm:items-center"
        >
          <p className="text-xs text-muted-foreground">
            You have unsaved changes. Nothing is sent anywhere until you save.
          </p>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto">
            <Button variant="ghost" size="sm" className="text-subtle-foreground" onClick={onRestoreDefaults}>
              Restore Defaults
            </Button>
            <Button variant="outline" size="sm" onClick={onDiscard}>
              Discard Changes
            </Button>
            <Button size="sm" onClick={onSave}>
              Save Changes
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Card } from "@/components/ui/card";
import { pipelineStages, activePipelineStageId } from "@/data/mission-control";

function Connector({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-1 hidden h-px flex-1 self-center bg-border sm:block sm:mx-2">
      {active && (
        <motion.div
          className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={reduceMotion ? undefined : { left: ["-33%", "100%"] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

export function ExecutionPipelineSection() {
  const reduceMotion = useReducedMotion();
  const activeIndex = pipelineStages.findIndex(
    (s) => s.id === activePipelineStageId
  );

  return (
    <section className="flex flex-col gap-4">
      <SectionHeader
        title="Execution Pipeline"
        description="The path every agent run takes, stage by stage."
      />

      <Card className="overflow-x-auto p-5">
        <div className="flex min-w-[640px] items-start sm:min-w-0">
          {pipelineStages.map((stage, i) => {
            const isActive = stage.id === activePipelineStageId;
            const isPast = i < activeIndex;

            return (
              <div key={stage.id} className="flex flex-1 items-start">
                <div className="flex flex-1 flex-col items-center gap-2.5 text-center">
                  <motion.div
                    className={cn(
                      "relative flex size-11 items-center justify-center rounded-full border transition-colors",
                      isActive
                        ? "border-primary bg-primary-muted text-primary-hover"
                        : isPast
                          ? "border-border-strong bg-surface-3 text-muted-foreground"
                          : "border-border bg-surface-2 text-subtle-foreground"
                    )}
                    animate={
                      isActive && !reduceMotion
                        ? { boxShadow: [
                            "0 0 0 0px rgba(79, 91, 238, 0.45)",
                            "0 0 0 6px rgba(79, 91, 238, 0)",
                          ] }
                        : undefined
                    }
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  >
                    <stage.icon className="size-4" />
                  </motion.div>
                  <div>
                    <p
                      className={cn(
                        "text-xs font-medium",
                        isActive ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {stage.label}
                    </p>
                    {isActive && (
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-primary-hover">
                        Active
                      </p>
                    )}
                  </div>
                </div>

                {i < pipelineStages.length - 1 && (
                  <Connector
                    active={i === activeIndex - 1 || i === activeIndex}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}

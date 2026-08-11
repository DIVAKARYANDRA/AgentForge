import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, History, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/StatusBadge";
import { useRuntimeHealth } from "@/hooks/useRuntime";

function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

/**
 * Maps GET /runtime/health (a real, live endpoint — see api/runtime.ts)
 * onto the existing StatusBadge vocabulary. Loading -> pending, network
 * failure -> down (with a retry affordance), success -> healthy/degraded
 * from the backend's own `healthy` boolean.
 */
function usePlatformStatus() {
  const { data, isPending, isError, refetch, isFetching } = useRuntimeHealth();

  if (isPending) return { status: "pending" as const, isFetching };
  if (isError) return { status: "down" as const, isFetching, refetch };
  return { status: data.healthy ? ("healthy" as const) : ("degraded" as const), isFetching, refetch };
}

export function MissionControlHeader() {
  const now = useClock();
  const platform = usePlatformStatus();
  const time = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const date = now.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end"
    >
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Mission Control
          </h1>
          <p className="mt-1.5 max-w-lg text-sm text-muted-foreground sm:text-base">
            Monitor, execute and orchestrate autonomous AI workflows.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button className="gap-2">
            <Plus className="size-4" />
            Launch Workflow
          </Button>
          <Button variant="outline" className="gap-2">
            <History className="size-4" />
            View History
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-6 lg:flex-col lg:items-end lg:gap-2">
        <div className="text-left lg:text-right">
          <p className="font-mono text-xl font-medium tabular-nums text-foreground">
            {time}
          </p>
          <p className="text-xs text-subtle-foreground">{date}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <StatusBadge status={platform.status} className="px-2.5 py-1 text-[11px]" />
          {platform.status === "down" && (
            <Button
              variant="ghost"
              size="icon"
              className="size-6 text-destructive hover:text-destructive"
              aria-label="Retry connecting to the backend"
              onClick={() => platform.refetch()}
              disabled={platform.isFetching}
            >
              <RotateCw className={platform.isFetching ? "size-3 animate-spin" : "size-3"} />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

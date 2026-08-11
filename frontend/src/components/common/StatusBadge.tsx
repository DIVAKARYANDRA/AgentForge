import { cn } from "@/lib/utils";

type Status =
  | "healthy"
  | "degraded"
  | "down"
  | "completed"
  | "running"
  | "failed"
  | "idle"
  | "pending"
  | "active"
  | "paused";

const STATUS_CONFIG: Record<
  Status,
  { label: string; dot: string; text: string; bg: string }
> = {
  healthy: {
    label: "Healthy",
    dot: "bg-success",
    text: "text-success",
    bg: "bg-success-muted",
  },
  completed: {
    label: "Completed",
    dot: "bg-success",
    text: "text-success",
    bg: "bg-success-muted",
  },
  active: {
    label: "Active",
    dot: "bg-info",
    text: "text-info",
    bg: "bg-primary-muted",
  },
  running: {
    label: "Running",
    dot: "bg-info",
    text: "text-info",
    bg: "bg-primary-muted",
  },
  idle: {
    label: "Idle",
    dot: "bg-subtle-foreground",
    text: "text-muted-foreground",
    bg: "bg-surface-3",
  },
  paused: {
    label: "Paused",
    dot: "bg-warning",
    text: "text-warning",
    bg: "bg-warning-muted",
  },
  pending: {
    label: "Pending",
    dot: "bg-subtle-foreground",
    text: "text-subtle-foreground",
    bg: "bg-surface-3",
  },
  degraded: {
    label: "Degraded",
    dot: "bg-warning",
    text: "text-warning",
    bg: "bg-warning-muted",
  },
  failed: {
    label: "Failed",
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive-muted",
  },
  down: {
    label: "Down",
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive-muted",
  },
};

interface StatusBadgeProps {
  status: Status;
  className?: string;
  /** "running" pulses its dot — everything else stays static. */
  pulse?: boolean;
}

export function StatusBadge({ status, className, pulse }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const shouldPulse = pulse ?? status === "running";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide",
        config.bg,
        config.text,
        className
      )}
    >
      <span className="relative flex size-1.5">
        {shouldPulse && (
          <span
            className={cn(
              "absolute inline-flex size-full animate-ping rounded-full opacity-60",
              config.dot
            )}
          />
        )}
        <span className={cn("relative inline-flex size-1.5 rounded-full", config.dot)} />
      </span>
      {config.label}
    </span>
  );
}

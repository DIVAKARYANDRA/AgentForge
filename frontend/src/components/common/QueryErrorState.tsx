import { AlertTriangle, WifiOff, TimerOff, RotateCw } from "lucide-react";
import { ApiError } from "@/api/client";
import { Button } from "@/components/ui/button";

interface QueryErrorStateProps {
  error: unknown;
  onRetry: () => void;
  /** Compact = inline within a card; default = full section placeholder. */
  compact?: boolean;
}

function describe(error: unknown): { icon: typeof AlertTriangle; title: string; detail: string } {
  if (error instanceof ApiError) {
    switch (error.kind) {
      case "network":
        return {
          icon: WifiOff,
          title: "Backend unreachable",
          detail: "Couldn't reach the AgentForge API. Confirm it's running and reachable.",
        };
      case "timeout":
        return {
          icon: TimerOff,
          title: "Request timed out",
          detail: "The backend didn't respond in time.",
        };
      case "http":
        return {
          icon: AlertTriangle,
          title: `Request failed${error.status ? ` (${error.status})` : ""}`,
          detail: error.message,
        };
      default:
        return { icon: AlertTriangle, title: "Couldn't load this data", detail: error.message };
    }
  }
  return {
    icon: AlertTriangle,
    title: "Something went wrong",
    detail: error instanceof Error ? error.message : "An unexpected error occurred.",
  };
}

export function QueryErrorState({ error, onRetry, compact }: QueryErrorStateProps) {
  const { icon: Icon, title, detail } = describe(error);

  return (
    <div
      role="alert"
      className={
        compact
          ? "flex items-center justify-between gap-3 rounded-md border border-destructive/30 bg-destructive-muted px-3 py-2.5"
          : "flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border py-12 text-center"
      }
    >
      {compact ? (
        <>
          <div className="flex items-center gap-2 text-xs text-destructive">
            <Icon className="size-3.5 shrink-0" />
            <span>{title}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onRetry} className="h-7 gap-1.5 text-destructive hover:text-destructive">
            <RotateCw className="size-3" />
            Retry
          </Button>
        </>
      ) : (
        <>
          <Icon className="size-6 text-destructive" />
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="max-w-xs text-xs text-muted-foreground">{detail}</p>
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-2 gap-1.5">
            <RotateCw className="size-3.5" />
            Retry
          </Button>
        </>
      )}
    </div>
  );
}

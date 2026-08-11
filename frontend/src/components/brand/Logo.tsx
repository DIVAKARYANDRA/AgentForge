import { cn } from "@/lib/utils";

interface LogoMarkProps {
  className?: string;
}

/**
 * AgentForge's mark: one solid node (the orchestrator) directing two
 * outlined nodes (subordinate agents) along thin signal lines. It reads
 * as a system of controlled autonomy rather than a literal "AI brain" —
 * the same triangular hierarchy shows up in the product's own concept of
 * a mission running multiple agents under one plan.
 *
 * Pure geometry, single accent color, no gradients — safe at 16px
 * (favicon / collapsed sidebar) and at hero scale alike.
 */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <line x1="16" y1="10" x2="9.5" y2="22" stroke="var(--color-primary)" strokeOpacity="0.45" strokeWidth="1.5" />
      <line x1="16" y1="10" x2="22.5" y2="22" stroke="var(--color-primary)" strokeOpacity="0.45" strokeWidth="1.5" />
      <line x1="9.5" y1="22" x2="22.5" y2="22" stroke="var(--color-border-strong)" strokeWidth="1.5" />

      {/* Orchestrator node */}
      <rect
        x="16"
        y="4.5"
        width="7.8"
        height="7.8"
        rx="1.5"
        transform="rotate(45 16 4.5)"
        fill="var(--color-primary)"
      />

      {/* Subordinate agent nodes */}
      <rect
        x="9.5"
        y="17.05"
        width="6.8"
        height="6.8"
        rx="1.5"
        transform="rotate(45 9.5 17.05)"
        fill="var(--color-surface)"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
      />
      <rect
        x="22.5"
        y="17.05"
        width="6.8"
        height="6.8"
        rx="1.5"
        transform="rotate(45 22.5 17.05)"
        fill="var(--color-surface)"
        stroke="var(--color-primary)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

interface LogoProps {
  /** "full" shows the mark + wordmark, "icon" shows the mark alone. */
  variant?: "full" | "icon";
  className?: string;
  markClassName?: string;
}

export function Logo({ variant = "full", className, markClassName }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={cn("size-6", markClassName)} />
      {variant === "full" && (
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          Agent<span className="font-medium text-muted-foreground">Forge</span>
        </span>
      )}
    </div>
  );
}

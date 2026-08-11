export function RadarEmptyState() {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-56 sm:size-64"
      aria-hidden="true"
    >
      <circle cx="120" cy="120" r="110" stroke="var(--color-border)" strokeWidth="1" />
      <circle cx="120" cy="120" r="78" stroke="var(--color-border)" strokeWidth="1" />
      <circle cx="120" cy="120" r="46" stroke="var(--color-border-strong)" strokeWidth="1" />

      <line x1="120" y1="10" x2="120" y2="230" stroke="var(--color-border)" strokeWidth="1" />
      <line x1="10" y1="120" x2="230" y2="120" stroke="var(--color-border)" strokeWidth="1" />

      {/* Idle agent nodes, orbiting the center at rest */}
      <circle cx="120" cy="42" r="3" fill="var(--color-subtle-foreground)" />
      <circle cx="198" cy="120" r="3" fill="var(--color-subtle-foreground)" />
      <circle cx="76" cy="180" r="3" fill="var(--color-subtle-foreground)" />

      {/* Sweep gradient — a single, quiet signal that the system is live */}
      <path
        d="M120 120 L120 10 A110 110 0 0 1 195.8 44.2 Z"
        fill="var(--color-primary)"
        opacity="0.08"
      />

      {/* Orchestrator mark at center */}
      <rect
        x="120"
        y="106"
        width="20"
        height="20"
        rx="4"
        transform="rotate(45 120 106)"
        fill="var(--color-primary)"
      />
    </svg>
  );
}

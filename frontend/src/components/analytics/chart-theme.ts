import type { CSSProperties } from "react";

/**
 * Recharts renders real SVG/DOM nodes, so passing "var(--color-x)"
 * strings works exactly like it does in WorkflowNode/WorkflowGraph —
 * charts stay in sync with the token system instead of hardcoding a
 * second copy of the palette.
 */
export const CHART_COLOR = {
  primary: "var(--color-primary)",
  primaryHover: "var(--color-primary-hover)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  destructive: "var(--color-destructive)",
  info: "var(--color-info)",
  border: "var(--color-border)",
  borderStrong: "var(--color-border-strong)",
  mutedForeground: "var(--color-muted-foreground)",
  subtleForeground: "var(--color-subtle-foreground)",
  surface2: "var(--color-surface-2)",
} as const;

export const chartTooltipStyle: CSSProperties = {
  backgroundColor: CHART_COLOR.surface2,
  border: `1px solid ${CHART_COLOR.borderStrong}`,
  borderRadius: 8,
  fontSize: 12,
  color: "var(--color-foreground)",
  padding: "8px 10px",
};

export const chartAxisTickStyle = {
  fill: CHART_COLOR.subtleForeground,
  fontSize: 11,
  fontFamily: "var(--font-mono)",
};

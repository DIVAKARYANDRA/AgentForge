import type { LucideIcon } from "lucide-react";
import {
  Radar,
  Bot,
  Workflow,
  BrainCircuit,
  BookOpen,
  Wrench,
  BarChart3,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

/**
 * Primary navigation. Every route here resolves to a real (currently
 * placeholder) page — see src/routes/index.tsx — so the sidebar is fully
 * functional even though most pages have no content yet.
 */
export const primaryNavItems: NavItem[] = [
  { label: "Mission Control", path: "/mission-control", icon: Radar },
  { label: "Agents", path: "/agents", icon: Bot },
  { label: "Workflows", path: "/workflows", icon: Workflow },
  { label: "Memory", path: "/memory", icon: BrainCircuit },
  { label: "Knowledge", path: "/knowledge", icon: BookOpen },
  { label: "Tools", path: "/tools", icon: Wrench },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
];

export const settingsNavItem: NavItem = {
  label: "Settings",
  path: "/settings",
  icon: Settings,
};

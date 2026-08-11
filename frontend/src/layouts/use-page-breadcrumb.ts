import { useLocation } from "react-router-dom";
import { primaryNavItems, settingsNavItem } from "@/layouts/navigation";

const allNavItems = [...primaryNavItems, settingsNavItem];

interface Breadcrumb {
  label: string;
}

/**
 * Resolves the active route to a page title + breadcrumb trail using the
 * shared nav config, so Topbar and Sidebar can never drift out of sync
 * on labels.
 */
export function usePageBreadcrumb(): {
  title: string;
  crumbs: Breadcrumb[];
} {
  const { pathname } = useLocation();
  const match = allNavItems.find((item) => pathname.startsWith(item.path));
  const title = match?.label ?? "AgentForge";

  return {
    title,
    crumbs: [{ label: "AgentForge" }, { label: title }],
  };
}

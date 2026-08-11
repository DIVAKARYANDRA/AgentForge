import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/layouts/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavListProps {
  items: NavItem[];
  /** Icon-only rail mode — labels hidden, tooltips shown instead. */
  collapsed?: boolean;
  /** Fired on item click — used to close the mobile drawer. */
  onNavigate?: () => void;
  className?: string;
}

export function NavList({ items, collapsed, onNavigate, className }: NavListProps) {
  return (
    <nav className={cn("flex flex-col gap-0.5 px-2", className)}>
      {items.map((item) => {
        const link = (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "group relative flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-primary-muted text-primary-hover"
                  : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <motion.span
                className="flex items-center gap-3"
                whileHover={{ x: collapsed ? 0 : 2 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {isActive && !collapsed && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute left-0 h-4 w-0.5 rounded-full bg-primary"
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}
                <item.icon
                  className={cn(
                    "size-4 shrink-0",
                    isActive ? "text-primary-hover" : "text-subtle-foreground group-hover:text-foreground"
                  )}
                />
                {!collapsed && (
                  <span className="truncate font-medium">{item.label}</span>
                )}
              </motion.span>
            )}
          </NavLink>
        );

        if (!collapsed) return link;

        return (
          <Tooltip key={item.path} delayDuration={200}>
            <TooltipTrigger asChild>{link}</TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        );
      })}
    </nav>
  );
}

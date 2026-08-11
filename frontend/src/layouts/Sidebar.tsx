import { motion } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen, FileText, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NavList } from "@/layouts/NavList";
import { primaryNavItems, settingsNavItem } from "@/layouts/navigation";
import { useSidebar } from "@/providers/sidebar-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Sidebar — the primary navigation rail. Collapses to an icon-only rail
 * (tooltips replace labels) and expands back with an animated width
 * transition. Reused as-is by every future page via MainLayout.
 */
export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="hidden md:flex h-full shrink-0 flex-col overflow-hidden border-r border-border bg-surface"
      aria-label="Primary navigation"
    >
      {/* Brand + collapse toggle */}
      <div
        className={cn(
          "flex h-14 shrink-0 items-center border-b border-border",
          collapsed ? "justify-center px-0" : "justify-between px-4"
        )}
      >
        {collapsed ? <LogoMark className="size-6" /> : <Logo />}
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-subtle-foreground hover:text-foreground"
            onClick={toggleCollapsed}
            aria-label="Collapse sidebar"
          >
            <PanelLeftClose className="size-4" />
          </Button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center border-b border-border py-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 text-subtle-foreground hover:text-foreground"
            onClick={toggleCollapsed}
            aria-label="Expand sidebar"
          >
            <PanelLeftOpen className="size-4" />
          </Button>
        </div>
      )}

      {/* Primary navigation */}
      <div className="flex-1 overflow-y-auto py-3">
        <NavList items={primaryNavItems} collapsed={collapsed} />
      </div>

      {/* Settings + footer */}
      <div className="shrink-0 border-t border-border py-3">
        <NavList items={[settingsNavItem]} collapsed={collapsed} />

        <Separator className="my-3" />

        <div
          className={cn(
            "flex items-center px-2",
            collapsed ? "flex-col gap-2" : "justify-between"
          )}
        >
          <ThemeToggle collapsed={collapsed} />

          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:text-foreground"
                aria-label="Documentation"
              >
                <FileText className="size-4" />
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Documentation</TooltipContent>
            )}
          </Tooltip>
        </div>

        <Separator className="my-3" />

        <div className="px-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-colors hover:bg-surface-2",
                  collapsed && "justify-center"
                )}
                aria-label="User menu"
              >
                <Avatar className="size-7">
                  <AvatarFallback>AR</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-foreground">
                        Alex Rivera
                      </p>
                      <p className="truncate text-[11px] text-subtle-foreground">
                        Workspace admin
                      </p>
                    </div>
                    <ChevronsUpDown className="size-3.5 shrink-0 text-subtle-foreground" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
              <div className="px-2 pb-1.5 text-xs text-muted-foreground">
                alex@agentforge.dev
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Workspace settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.aside>
  );
}

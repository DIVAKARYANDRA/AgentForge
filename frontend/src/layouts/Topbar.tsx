import { ChevronRight, Menu, Search, Bell, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/providers/sidebar-provider";
import { usePageBreadcrumb } from "@/layouts/use-page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Topbar — breadcrumbs, global search (placeholder), notifications,
 * workspace selector (placeholder), and user avatar. No backend wiring;
 * every control here is visual scaffolding for a future pass.
 */
export function Topbar() {
  const { setMobileOpen } = useSidebar();
  const { title, crumbs } = usePageBreadcrumb();

  return (
    <header className="glass glass-border sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b px-4 md:px-6">
      {/* Mobile nav trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground hover:text-foreground md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="size-4" />
      </Button>

      {/* Breadcrumbs */}
      <div className="flex min-w-0 items-center gap-1.5">
        {crumbs.map((crumb, i) => (
          <span key={crumb.label} className="flex items-center gap-1.5">
            {i > 0 && (
              <ChevronRight className="size-3.5 shrink-0 text-subtle-foreground" />
            )}
            <span
              className={cn(
                "truncate text-sm",
                i === crumbs.length - 1
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </div>

      <span className="sr-only">{title}</span>

      <div className="flex-1" />

      {/* Global search — placeholder only, not wired to anything */}
      <button
        type="button"
        className="hidden items-center gap-2 rounded-md border border-border bg-surface-2 px-2.5 py-1.5 text-sm text-subtle-foreground shadow-sm shadow-black/10 transition-colors hover:border-border-strong hover:text-muted-foreground sm:flex"
        aria-label="Search (not yet available)"
      >
        <Search className="size-3.5" />
        <span className="w-36 text-left">Search AgentForge…</span>
        <kbd className="ml-2 rounded-sm border border-border-strong bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-subtle-foreground">
          ⌘K
        </kbd>
      </button>

      <Button
        variant="ghost"
        size="icon"
        className="size-8 text-muted-foreground hover:text-foreground sm:hidden"
        aria-label="Search"
      >
        <Search className="size-4" />
      </Button>

      {/* Workspace selector — placeholder */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="hidden items-center gap-1.5 text-muted-foreground md:flex"
          >
            <span className="max-w-28 truncate">Acme Corp</span>
            <ChevronsUpDown className="size-3.5 text-subtle-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Acme Corp</DropdownMenuItem>
          <DropdownMenuItem>Personal</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Create workspace</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        className="relative size-8 text-muted-foreground hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="size-4" />
        <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" />
      </Button>

      {/* User avatar */}
      <Avatar className="size-7">
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
    </header>
  );
}

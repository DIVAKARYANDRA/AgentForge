import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { NavList } from "@/layouts/NavList";
import { primaryNavItems, settingsNavItem } from "@/layouts/navigation";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/providers/sidebar-provider";

export function MobileNavDrawer() {
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent side="left" className="p-0">
        <div className="flex h-14 shrink-0 items-center border-b border-border px-4">
          <Logo />
        </div>

        <div className="flex-1 overflow-y-auto py-3">
          <NavList items={primaryNavItems} onNavigate={() => setMobileOpen(false)} />
        </div>

        <div className="shrink-0 border-t border-border py-3">
          <NavList items={[settingsNavItem]} onNavigate={() => setMobileOpen(false)} />
          <Separator className="my-3" />
          <div className="flex items-center justify-between px-4">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

import { useOutlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Sidebar } from "@/layouts/Sidebar";
import { Topbar } from "@/layouts/Topbar";
import { MobileNavDrawer } from "@/layouts/MobileNavDrawer";
import { SidebarProvider } from "@/providers/sidebar-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

/**
 * MainLayout — the authenticated app shell.
 *
 * Composes Sidebar + Topbar around routed page content, with a subtle
 * cross-fade between pages. Individual pages own their own UI; this only
 * owns shell geometry, navigation state, and the page transition.
 */
export function MainLayout() {
  const outlet = useOutlet();
  const { pathname } = useLocation();

  return (
    <SidebarProvider>
      <TooltipProvider>
        <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
          <Sidebar />
          <MobileNavDrawer />
          <div className="flex min-w-0 flex-1 flex-col">
            <Topbar />
            <main className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {outlet}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </SidebarProvider>
  );
}

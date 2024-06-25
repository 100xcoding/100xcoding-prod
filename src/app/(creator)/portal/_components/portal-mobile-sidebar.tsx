import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { PortalSidebar } from "./portal-sidebar";
export const PortalMobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 dark:bg-muted-foreground border border-primary"
      >
        <PortalSidebar />
      </SheetContent>
    </Sheet>
  );
};

import React from "react";
import { PortalNavbarRoutes } from "./portal-navbar-routes";
import { PortalMobileSidebar } from "./portal-mobile-sidebar";

export const PortalNavbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center  shadow-sm bg-primary">
      <PortalMobileSidebar />
      <PortalNavbarRoutes />
    </div>
  );
};

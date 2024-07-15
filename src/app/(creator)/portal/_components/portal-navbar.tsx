import React from "react";
import { PortalNavbarRoutes } from "./portal-navbar-routes";
import { PortalMobileSidebar } from "./portal-mobile-sidebar";

export const PortalNavbar = () => {
  return (
    <div className="p-4 border-b border-green-500 h-full flex items-center  shadow-sm bg-dark-400 text-white">
      <PortalMobileSidebar />
      <PortalNavbarRoutes />
    </div>
  );
};

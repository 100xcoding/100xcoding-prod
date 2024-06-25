import React from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

export const Navbar = () => {
  return (
    <nav className="py-2.5 bg-[#110327] bg-opacity-65 border-b-[2px] border-[#6665E5]/30">
      <div className="container mx-auto">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </nav>
  );
};

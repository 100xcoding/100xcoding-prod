import React from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

export const Navbar = () => {
	return (
		<nav className="py-2.5 px-2 bg-primary">
			<div className="container mx-auto">
				<MobileSidebar />
				<NavbarRoutes />
			</div>
		</nav>
	);
};

import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

export const Navbar = () => {
  return (
    <nav className="py-2.5 bg-dark-200  text-white shadow-lg">
      <div className="container mx-auto">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </nav>
  );
};

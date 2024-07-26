import { MobileSidebar } from "./mobile-sidebar";
import { NavbarRoutes } from "./navbar-routes";

export const Navbar = () => {
  return (
    <nav className="text-white">
      <div className="h-full w-full  bg-dark-300  dark:bg-grid-white/[0.2] bg-grid-green-500/[0.15]  relative">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-dark-300  [mask-image:radial-gradient(ellipse_at_center,transparent_10%,#0D0F10)]"></div>
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </nav>
  );
};

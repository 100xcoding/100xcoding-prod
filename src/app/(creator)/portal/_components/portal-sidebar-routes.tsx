"use client";
import { BarChart, BookOpen, Compass, Layout, List } from "lucide-react";
import { PortalSidebarItem } from "./portal-sidebar-item";
const routes = [
  {
    icon: List,
    label: "Challenges",
    href: "/portal/challenges",
  },
  {
    icon: BarChart,
    label: "Quiz",
    href: "/portal/quiz",
  },
  {
    icon: BookOpen,
    label: "Resources",
    href: "/portal/resources",
  },
];
export const PortalSidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <PortalSidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

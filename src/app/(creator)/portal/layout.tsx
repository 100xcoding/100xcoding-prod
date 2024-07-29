import { Footer } from "@/components/footer";
import React from "react";
import { PortalNavbar } from "./_components/portal-navbar";
import { PortalSidebar } from "./_components/portal-sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const PortalLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session?.user?.role !== "creator") {
    redirect("/");
  }
  return (
    <div className="flex flex-col min-h-screen bg-dark-300">
      <div className="h-[75px] md:pl-56 fixed inset-y-0 w-full z-50">
        <PortalNavbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <PortalSidebar />
      </div>
      <main className="flex-1 md:pl-56 pt-[75px] h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default PortalLayout;

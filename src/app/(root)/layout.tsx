import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import React from "react";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 dark:bg-transparent dark:bg-grid-violet-500/[0.17]">
        <div className="container mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;

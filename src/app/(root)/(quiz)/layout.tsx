import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import React from "react";

const QuizLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col  min-h-screen">
      <section className="bg-[#110327] w-full px-2 md:container md:mx-auto md:px-0">
        {children}
      </section>
    </div>
  );
};

export default QuizLayout;

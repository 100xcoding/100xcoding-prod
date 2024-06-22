import { CallToAction } from "@/components/call-to-action";
import { FAQ } from "@/components/faq";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <FAQ />
    </div>
  );
};

export default HomePage;

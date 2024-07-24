import { Loader } from "@/components/loader";
import { CallToAction } from "./_components/call-to-action";
import { FAQ } from "./_components/faq";
// import { HeroSection } from "./_components/hero-section";
import { HowItWorks } from "./_components/how-it-works";
// import { Testimonials } from "./_components/testimonials";
import dynamic from "next/dynamic";
const DynamicComponent = dynamic(
  () => import("./_components/hero-section").then((mod) => mod.HeroSection),
  {
    loading: () => <Loader />,
    ssr: false,
  },
);
const HomePage = () => {
  return (
    <div>
      <DynamicComponent />
      <HowItWorks />
      {/* <Testimonials /> */}
      <CallToAction />
      <FAQ />
    </div>
  );
};

export default HomePage;

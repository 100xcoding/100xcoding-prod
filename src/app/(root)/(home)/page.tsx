import { CallToAction } from "./_components/call-to-action";
import { FAQ } from "./_components/faq";
import { HeroSection } from "./_components/hero-section";
import { HowItWorks } from "./_components/how-it-works";
import { Testimonials } from "./_components/testimonials";


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

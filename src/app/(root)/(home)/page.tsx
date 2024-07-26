import { CallToAction } from "./_components/call-to-action";
import { FAQ } from "./_components/faq";
import { HowItWorks } from "./_components/how-it-works";
import { Hero } from "./_components/hero";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <HowItWorks />
      <CallToAction />
      <FAQ />
    </div>
  );
};

export default HomePage;

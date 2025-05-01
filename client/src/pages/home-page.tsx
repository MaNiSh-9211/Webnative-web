import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import CTASection from "@/components/cta-section";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>WebNative - Native OS Access for Web Apps</title>
        <meta name="description" content="Unleash the full potential of web applications with direct access to file systems and OS capabilities." />
      </Helmet>
      <div>
        <HeroSection />
        <FeaturesSection />
        <CTASection />
      </div>
    </>
  );
}

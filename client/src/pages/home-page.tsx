import MainLayout from "@/layouts/main-layout";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import HowItWorksSection from "@/components/landing/how-it-works-section";
import DownloadSection from "@/components/landing/download-section";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DownloadSection />
      </motion.div>
    </MainLayout>
  );
}

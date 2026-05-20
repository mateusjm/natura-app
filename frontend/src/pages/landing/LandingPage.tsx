import LandingLayout from "@/components/Landing/LandingLayout";
import BenefitsSection from "@/components/Landing/sections/BenefitsSection";
import CtaSection from "@/components/Landing/sections/CtaSection";
import FeaturesSection from "@/components/Landing/sections/FeaturesSection";
import HeroSection from "@/components/Landing/sections/HeroSection";
import HowItWorksSection from "@/components/Landing/sections/HowItWorksSection";

export default function LandingPage() {
  return (
    <LandingLayout>
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CtaSection />
    </LandingLayout>
  );
}

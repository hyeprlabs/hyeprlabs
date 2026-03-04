import { HeroSection } from "@/components/marketing/hero";
import { LogosSection } from "@/components/marketing/logos-section";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogosSection />
      <CallToAction />
      <Footer />
    </>
  );
}

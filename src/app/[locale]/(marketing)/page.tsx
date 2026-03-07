import { HeroSection } from "@/components/marketing/hero";
import { LogosSection } from "@/components/marketing/logos-section";
import { BlogCta } from "@/components/marketing/blog/blog-cta";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LogosSection />
      <BlogCta />
      <CallToAction />
      <Footer />
    </>
  );
}

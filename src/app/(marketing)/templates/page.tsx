import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { TemplatesList } from "@/components/templates/templates-list";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "A collection of production-ready Next.js templates to jumpstart your next project.",
  keywords: ["Next.js Templates", "React Templates", "Tailwind CSS Templates", "Open Source Boilerplates", "SaaS Starter Kit", "Hyepr Labs Templates"],
  openGraph: {
    title: "Templates | Hyepr Labs | Think Fast. Build Fast.",
    description: "A collection of production-ready Next.js templates to jumpstart your next project.",
    url: "https://hyeprlabs.com/templates",
  }
};

export default function Page() {
  return (
    <>
      <MarketingHero
        badge="TEMPLATES"
        title="Open Source Blueprints"
        description="A collection of production-ready Next.js templates to jumpstart your next project."
      />
      <TemplatesList />
      <Article />
      <CallToAction />
      <Footer />
    </>
  );
}

function Article() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-12 text-sm tracking-wider sm:text-lg font-mono text-muted-foreground">
      <header className="mb-10 text-center">
        <h2 className="text-xl sm:text-2xl font-medium text-foreground mb-4">
          Accelerate Your Development
        </h2>
        <p className="leading-relaxed">
          We believe in the power of{" "}
          <span className="text-foreground">open source</span>. By sharing our
          internal tools and starting points, we aim to help developers and
          businesses ship better products, faster.
        </p>
      </header>

      <div className="space-y-8 text-left">
        <p className="leading-relaxed">
          Each template is a distillation of our best practices, refined over
          years of building production-grade applications. They come
          pre-configured with the tools we trust:{" "}
          <span className="text-foreground">
            Next.js, TypeScript, Tailwind CSS, and Shadcn UI
          </span>
          .
        </p>

        <p className="leading-relaxed">
          Our goal is to eliminate the repetitive setup phase. Instead of
          configuring linters or setting up authentication from scratch, you can
          dive straight into building the{" "}
          <span className="text-foreground">unique features</span> that matter
          to your users.
        </p>

        <p className="leading-relaxed">
          These blueprints are fully customizable and opinionated where it
          counts. They are designed to be{" "}
          <span className="text-foreground">scalable foundations</span>, not
          rigid constraints. Fork them, learn from them, and build something
          amazing.
        </p>
      </div>
    </article>
  );
}

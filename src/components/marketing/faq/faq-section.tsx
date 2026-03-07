import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { FAQPageJsonLd } from "@/components/seo/json-ld";

type FaqItem = {
  question: string;
  answer: string;
};

export async function FaqSection() {
  const t = await getTranslations("FaqSection");
  const rawFaqs = t.raw("faqs") as FaqItem[];

  return (
    <section
      aria-labelledby="faq-section-heading"
      className="relative mx-auto w-full max-w-5xl mb-12 md:mb-36"
    >
      <FAQPageJsonLd faqs={rawFaqs} />
      <FullWidthDivider position="top" />

      <div className="grid grid-cols-1 gap-x-16 gap-y-10 px-4 py-12 md:grid-cols-5 md:py-20">
        {/* ── Left column ── */}
        <div className="md:col-span-2 md:sticky md:top-24 md:self-start">
          <Badge
            variant="outline"
            className="mb-4 font-mono bg-linear-to-br from-muted to-background"
          >
            {t("badge")}
          </Badge>

          <h2
            id="faq-section-heading"
            className="mb-4 text-2xl font-serif md:text-3xl lg:text-4xl"
          >
            {t("heading")}
          </h2>

          <p className="mb-8 max-w-sm text-balance text-sm font-mono tracking-wider text-muted-foreground sm:text-base">
            {t("description")}
          </p>

          <Link href="/contact">
            <Button
              variant="outline"
              className="rounded-full bg-linear-to-br from-muted to-background"
            >
              {t("cta")}
              <ArrowRight aria-hidden />
            </Button>
          </Link>
        </div>

        {/* ── Right column: accordion ── */}
        <div className="md:col-span-3">
          <Accordion type="single" collapsible className="w-full">
            {rawFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-mono text-sm tracking-wide leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <FullWidthDivider position="bottom" />
    </section>
  );
}

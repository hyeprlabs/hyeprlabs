import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "@/i18n/navigation";
import { FAQPageJsonLd } from "@/components/seo/json-ld";

type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Hyepr Labs FAQ section — efferd FAQ 5 block
 * Two-column layout: sticky info panel left, accordion right.
 * Source: pnpm dlx shadcn@latest add @efferd/faqs-5
 */
export async function Faqs() {
  const t = await getTranslations("FaqSection");
  const items = t.raw("faqs") as FaqItem[];

  return (
    <section
      aria-labelledby="faqs-heading"
      className="mx-auto w-full max-w-5xl px-4 py-16 md:py-24"
    >
      <FAQPageJsonLd faqs={items} />

      <div className="grid gap-12 md:grid-cols-5 md:gap-16">
        {/* ── Left: info panel ── */}
        <div className="flex flex-col gap-6 md:col-span-2 md:sticky md:top-24 md:self-start">
          <span className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">
            {t("badge")}
          </span>

          <h2
            id="faqs-heading"
            className="text-3xl font-serif leading-tight md:text-4xl"
          >
            {t("heading")}
          </h2>

          <p className="text-sm font-mono leading-relaxed tracking-wide text-muted-foreground md:text-base">
            {t("description")}
          </p>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
          >
            {t("cta")}
            <svg
              aria-hidden={true}
              className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Right: accordion ── */}
        <div className="md:col-span-3">
          <Accordion collapsible className="w-full" type="single">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-mono text-sm leading-relaxed tracking-wide text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

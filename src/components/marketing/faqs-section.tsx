"use client";
import { cn } from "@/lib/utils";

import React from "react";
import { useTranslations } from "next-intl";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { DecorIcon } from "@/components/ui/decor-icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon, SearchSlashIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

type FaqItem = {
  id: number;
  category: "websites" | "seo" | "pricing" | "process";
  title: string;
  content: string;
};

export function FaqsSection() {
  const t = useTranslations("FaqsSection");
  const [searchTerm, setSearchTerm] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");

  const faqs = t.raw("items") as FaqItem[];

  const categories = [
    { id: "all", label: t("categories.all") },
    { id: "websites", label: t("categories.websites") },
    { id: "seo", label: t("categories.seo") },
    { id: "pricing", label: t("categories.pricing") },
    { id: "process", label: t("categories.process") },
  ];

  const filtered = faqs.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch =
      faq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative mx-auto mb-12 w-full max-w-5xl md:mb-36">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />
      <FullWidthDivider position="top" />
      <div className="px-4 py-8 md:py-12">
        <h1 className="mb-4 font-semibold text-3xl md:text-4xl">
          {t("title")}
        </h1>
        <p className="mb-8 max-w-2xl text-muted-foreground font-mono text-sm md:text-base">
          {t("description")}
        </p>

        <InputGroup className="max-w-sm">
          <InputGroupInput
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
          />
          <InputGroupAddon>
            <SearchIcon data-icon="inline-start" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      <FullWidthDivider contained />

      <div className="flex flex-wrap gap-1 border-b px-4 md:gap-3">
        {categories.map((cat) => (
          <button
            className="flex flex-col"
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            type="button"
          >
            <span
              className={cn(
                "p-1 text-muted-foreground text-sm hover:text-primary md:p-2 md:text-base",
                activeCategory === cat.id && "text-primary",
              )}
            >
              {cat.label}
            </span>
            {activeCategory === cat.id && (
              <span className="h-0.5 w-full rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>

      <Accordion
        className="space-y-2 border-0! px-4 py-12 lg:px-6"
        collapsible
        type="single"
      >
        {filtered.map((faq) => (
          <AccordionItem
            className="rounded-2xl border px-4 shadow-xs"
            key={faq.id}
            value={faq.id.toString()}
          >
            <AccordionTrigger className="hover:no-underline">
              {faq.title}
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 text-muted-foreground">
              {faq.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {filtered.length === 0 && (
        <Empty className="py-10">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchIcon />
            </EmptyMedia>
            <EmptyTitle>{t("emptyTitle")}</EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => setSearchTerm("")} variant="outline">
              <SearchSlashIcon data-icon="inline-start" />
              {t("clearSearch")}
            </Button>
          </EmptyContent>
        </Empty>
      )}

      <div className="flex items-center px-4 py-6 lg:px-6">
        <p className="text-muted-foreground font-mono text-sm">
          {t("contactPrompt")}{" "}
          <Link className="text-primary hover:underline" href="/contact">
            {t("contactLink")}
          </Link>
        </p>
      </div>
      <FullWidthDivider position="bottom" />
    </section>
  );
}

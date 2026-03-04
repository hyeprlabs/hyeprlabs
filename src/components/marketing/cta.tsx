import { DecorIcon } from "@/components/ui/decor-icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CallToAction() {
  return (
    <div className="relative mx-auto mb-12 md:mb-36 flex w-full max-w-5xl flex-col justify-between gap-y-4 border-y px-4 py-8 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <DecorIcon className="size-4" position="bottom-left" />
      <DecorIcon className="size-4" position="bottom-right" />

      <div className="absolute top-0 left-1/2 -z-10 h-full border-l border-dashed" />

      <h2 className="text-center text-2xl md:text-3xl font-serif">
        Start for Free Today!
      </h2>
      <p className="text-balance text-center font-mono text-muted-foreground text-sm md:text-base">
        Begin your 6-day free trial today to fully explore and experience all
        the features and benefits we offer.
      </p>

      <div className="flex items-center justify-center gap-2">
        <Link href="/contact">
          <Button variant="outline" className="rounded-full bg-linear-to-br from-muted to-background">
            Contact
          </Button>
        </Link>
        <Link href="/projects">
          <Button className="rounded-full bg-linear-to-br from-foreground to-muted-foreground">
            Projects
            <ArrowRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}

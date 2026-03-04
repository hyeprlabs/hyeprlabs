"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { ArrowRight } from "lucide-react"
import { HyeprLabsWordmark } from "@/components/marketing/brand/logos";

export const navLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Templates",
    href: "/templates",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

export function Header() {
  const scrolled = useScroll(10);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
            scrolled,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          },
        )}
      >
        <Link href="/">
          <HyeprLabsWordmark className="h-5 w-auto" />
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <div>
            {navLinks.map((link) => (
              <Button asChild key={link.label} size="sm" variant="ghost" className="font-normal">
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </div>
          <Link href="/contact">
            <Button size="sm" variant="outline" className="bg-linear-to-br from-muted to-background font-normal">
              Contact
            </Button>
          </Link>
          <Link href="/projects">
            <Button size="sm" className="bg-linear-to-br from-foreground to-muted-foreground">
              Projects
              <ArrowRight />
            </Button>
          </Link>
          <Button size="sm" variant="outline" className="hidden">
            Sign In
          </Button>
          <Button size="sm" className="hidden">
            Get Started
          </Button>
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}

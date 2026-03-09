"use client"

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/marketing/mobile-nav";
import { ArrowRight } from "lucide-react"
import { HyeprLabsWordmark } from "@/components/marketing/brand/logos";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@clerk/nextjs";
import { UserDropdown } from "@/components/marketing/user-dropdown";

export function Header() {
  const scrolled = useScroll(10);
  const t = useTranslations("Header");
  const { isSignedIn } = useAuth();

  const navLinks = [
    { label: t("about"), href: "/about" as const },
    { label: t("templates"), href: "/templates" as const },
    { label: t("blog"), href: "/blog" as const },
  ];

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
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
          <Link href="/contact">
            <Button size="sm" variant="outline" className="bg-linear-to-br from-muted to-background font-normal">
              {t("contact")}
            </Button>
          </Link>
          {isSignedIn ? (
            <UserDropdown />
          ) : (
            <Link href="/sign-in">
              <Button size="sm" className="bg-linear-to-br from-foreground to-muted-foreground">
                {t("signIn")}
                <ArrowRight />
              </Button>
            </Link>
          )}
        </div>
        <MobileNav navLinks={navLinks} />
      </nav>
    </header>
  );
}

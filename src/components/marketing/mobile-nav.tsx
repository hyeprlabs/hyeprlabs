"use client"

import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { X, Menu, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface NavLink {
  label: string;
  href: string;
}

export function MobileNav({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = React.useState(false);
  const tHeader = useTranslations("Header");
  const tMobileNav = useTranslations("MobileNav");

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label={tMobileNav("toggleMenu")}
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <X className="size-4.5" />
        ) : (
          <Menu className="size-4.5" />
        )}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "size-full p-4",
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="grid gap-y-2">
              {navLinks.map((link) => (
                <Button
                  asChild
                  className="justify-start"
                  key={link.label}
                  variant="ghost"
                >
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-2">
              <Link href="/contact">
                <Button size="sm" variant="outline" className="w-full font-normal">
                  {tHeader("contact")}
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="sm" className="w-full">
                  {tHeader("projects")}
                  <ArrowRight />
                </Button>
              </Link>
              <Button variant="outline" className="w-full hidden">
                Sign In
              </Button>
              <Button className="w-full hidden">
                Get Started
              </Button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

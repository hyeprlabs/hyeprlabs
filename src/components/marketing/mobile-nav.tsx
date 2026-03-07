"use client"

import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { X, Menu, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

interface NavLink {
  label: string;
  href: string;
}

export function MobileNav({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = React.useState(false);
  const tHeader = useTranslations("Header");
  const tMobileNav = useTranslations("MobileNav");
  const pathname = usePathname();
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // ESC key closes menu
  React.useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Move focus into menu when opened; restore focus when closed
  React.useEffect(() => {
    if (open) {
      const first = menuRef.current?.querySelector<HTMLElement>(
        "a, button, [tabindex]",
      );
      first?.focus();
    }
  }, [open]);

  function handleClose() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="md:hidden">
      <Button
        ref={triggerRef}
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label={tMobileNav("toggleMenu")}
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <X className="size-4.5" aria-hidden />
        ) : (
          <Menu className="size-4.5" aria-hidden />
        )}
      </Button>
      {open && (
        <Portal className="top-14" id="mobile-menu">
          <PortalBackdrop onClick={handleClose} />
          <div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={tMobileNav("menuLabel")}
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
                <Button size="sm" variant="outline" className="w-full bg-linear-to-br from-muted to-background font-normal">
                  {tHeader("contact")}
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="sm" className="w-full bg-linear-to-br from-foreground to-muted-foreground">
                  {tHeader("projects")}
                  <ArrowRight aria-hidden />
                </Button>
              </Link>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}

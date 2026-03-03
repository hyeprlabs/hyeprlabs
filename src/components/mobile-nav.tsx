import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/components/header";
import { X, Menu, ArrowRight } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
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
                  <a href={link.href}>{link.label}</a>
                </Button>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-2">
              <Link href="/contact">
                <Button size="sm" variant="outline" className="w-full bg-linear-to-br from-muted to-background font-normal">
                  Contact
                </Button>
              </Link>
              <Link href="/projects">
                <Button size="sm" className="w-full bg-linear-to-br from-foreground to-muted-foreground">
                  Projects
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

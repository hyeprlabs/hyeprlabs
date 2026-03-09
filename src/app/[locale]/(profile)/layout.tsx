import { HyeprLabsWordmark } from "@/components/marketing/brand/logos";
import { Link } from "@/i18n/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      {/* Decorative vertical border lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -inset-x-20 inset-y-0 bg-[radial-gradient(ellipse_at_center,theme(--color-foreground/.04),transparent)] blur-[80px]" />
      </div>

      {/* Top nav bar — logo only, no marketing header */}
      <header className="relative mx-auto flex h-14 w-full max-w-4xl items-center border-b border-border">
        <Link href="/" aria-label="Hyepr Labs home">
          <HyeprLabsWordmark className="h-5 w-auto opacity-80 transition-opacity hover:opacity-100" />
        </Link>
      </header>

      {/* Page content */}
      <main
        className="relative mx-auto w-full max-w-4xl grow
          before:absolute before:-inset-y-0 before:-left-px before:w-px before:bg-border
          after:absolute after:-inset-y-0 after:-right-px after:w-px after:bg-border"
      >
        {children}
      </main>
    </div>
  );
}

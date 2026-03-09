import { HyeprLabsWordmark } from "@/components/marketing/brand/logos";
import { Link } from "@/i18n/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -inset-x-20 inset-y-0 bg-[radial-gradient(ellipse_at_center,theme(--color-foreground/.06),transparent)] blur-[80px]" />
        <div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border to-transparent md:left-16" />
        <div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border to-transparent md:right-16" />
      </div>

      {/* Logo */}
      <Link href="/" className="mb-8" aria-label="Hyepr Labs home">
        <HyeprLabsWordmark className="h-6 w-auto opacity-80 transition-opacity hover:opacity-100" />
      </Link>

      {/* Form card */}
      <div className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}

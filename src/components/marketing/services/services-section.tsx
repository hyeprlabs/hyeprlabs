import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { CheckIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

type Service = {
  title: string;
  description: string;
  price: string;
  billing: string;
  delivery: string;
  features: string[];
  cta: string;
};

const serviceMeta = [
  { href: "/contact" as const, featured: false },
  { href: "/contact" as const, featured: false },
  { href: "/contact" as const, featured: true },
];

export async function ServicesSection() {
  const t = await getTranslations("ServicesSection");
  const rawServices = t.raw("services") as Service[];

  const services = rawServices.map((service, index) => {
    const meta = serviceMeta[index];
    if (!meta) {
      throw new Error(`Missing metadata for service at index ${index}`);
    }
    return {
      ...service,
      ...meta,
    };
  });

  return (
    <div className="mx-auto w-full max-w-5xl place-content-center space-y-12 mb-12 md:mb-36">
      <div className="relative grid grid-cols-1 gap-px bg-border">
        <FullWidthDivider position="top" />
        {services.map((service) => (
          <ServiceCard
            service={service}
            popularLabel={t("popular")}
            key={service.title}
          />
        ))}
        <FullWidthDivider position="bottom" />
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  popularLabel,
  className,
  ...props
}: {
  service: Service & { href: "/contact"; featured: boolean };
  popularLabel: string;
} & React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden bg-background p-6 md:p-8",
        "before:absolute before:inset-0 before:bg-linear-to-br before:from-muted before:to-background before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className,
      )}
      {...props}
    >
      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-xl font-medium md:text-2xl">{service.title}</h3>
          {service.featured && (
            <Badge variant="outline" className="shrink-0 text-xs font-mono">
              {popularLabel}
            </Badge>
          )}
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground font-mono">
          {service.description}
        </p>

        <div>
          <div className="text-3xl tracking-tight text-foreground font-medium">
            {service.price}
            <span className="ml-2 text-sm text-muted-foreground font-mono">
              {service.billing}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground font-mono">
            {service.delivery}
          </p>
        </div>

        <ul className="space-y-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-muted-foreground font-mono"
            >
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-foreground/70" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-2">
          <Link href={service.href}>
            <Button
              className="w-full"
              variant={service.featured ? "default" : "outline"}
            >
              {service.cta}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

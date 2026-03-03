import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, ExternalLink, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type TemplateType = {
  title: string;
  description: string;
  price: string;
  previewLink: string;
  repoLink: string;
  features: string[];
  image?: string;
};

export function TemplatesList() {
  return (
    <div className="mx-auto w-full max-w-5xl place-content-center space-y-12">
      <div className="relative grid grid-cols-1 gap-px bg-border md:grid-cols-2">
        <FullWidthDivider position="top" />
        {templates.map((template) => (
          <TemplateCard template={template} key={template.title} />
        ))}
        <FullWidthDivider position="bottom" />
      </div>
    </div>
  );
}

export function TemplateCard({
  template,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  template: TemplateType;
}) {
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
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted border">
          {template.image ? (
            <Image
              src={template.image}
              alt={template.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted text-muted-foreground font-mono text-xs tracking-wider">
              NO PREVIEW
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="text-xs font-mono bg-linear-to-br from-muted to-background"
          >
            {template.price}
          </Badge>
          <div className="flex gap-2">
            <Link
              href={template.repoLink}
              className="text-muted-foreground transition-colors hover:text-primary flex items-center gap-1 text-xs font-mono"
            >
              GITHUB 
              <ArrowUpRightIcon className="size-3" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-xl md:text-2xl mb-2">
            {template.title}
          </h3>
          <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-6">
            {template.description}
          </p>
        </div>

        <ul className="space-y-2 mt-auto">
          {template.features.map((feature) => (
            <li
              key={feature}
              className="text-sm font-mono text-muted-foreground flex items-center gap-2"
            >
              <Check className="size-4 text-green-500" />
              {feature}
            </li>
          ))}
        </ul>

        <Link href={template.previewLink}>
          <Button variant="outline" className="w-full mt-6 cursor-pointer">
            Live Preview
            <ExternalLink />
          </Button>
        </Link>
      </div>
    </div>
  );
}

const templates: TemplateType[] = [
  {
    title: "Next.js SaaS Foundation",
    description:
      "The ultimate starting point for your next SaaS product. Built with scalability and performance in mind.",
    price: "FREE",
    previewLink: "#",
    repoLink: "#",
    features: [
      "Auth.js (NextAuth) Integration",
      "Prisma ORM with PostgreSQL",
      "Stripe Subscription & Webhooks",
      "Shadcn UI Components",
    ],
  },
  {
    title: "Minimalist Blog",
    description:
      "A content-focused blog template designed for optimal reading experience and high SEO performance.",
    price: "FREE",
    previewLink: "#",
    repoLink: "#",
    features: [
      "MDX Content Management",
      "Syntax Highlighting",
      "Dynamic OG Images",
      "RSS Feed Generation",
    ],
  },
  {
    title: "Modern E-Commerce",
    description:
      "A high-conversion e-commerce storefront template tailored for Shopify stores using the Storefront API.",
    price: "FREE",
    previewLink: "#",
    repoLink: "#",
    features: [
      "Shopify Storefront API",
      "Cart & Checkout Logic",
      "Product Variants & Search",
      "Framer Motion Animations",
    ],
  },
  {
    title: "Creative Portfolio",
    description:
      "Showcase your work with style. A portfolio template featuring smooth page transitions and interactive elements.",
    price: "FREE",
    previewLink: "#",
    repoLink: "#",
    features: [
      "Page Transitions",
      "Case Study Layouts",
      "Dark/Light Mode",
      "Contact Form Integration",
    ],
  },
];

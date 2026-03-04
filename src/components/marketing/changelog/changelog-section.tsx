import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

type ChangelogType = {
  version: string;
  date: string;
  project: string;
  title: string;
  description: string;
  changes: string[];
};

export function ChangelogSection() {
  return (
    <div className="mx-auto w-full max-w-5xl place-content-center space-y-12 mb-12 md:mb-36">
      <div className="relative grid grid-cols-1 gap-px bg-border">
        <FullWidthDivider position="top" />
        {changelogs.map((changelog) => (
          <ChangelogCard changelog={changelog} key={changelog.version} />
        ))}
        <FullWidthDivider position="bottom" />
      </div>
    </div>
  );
}

function ChangelogCard({
  changelog,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  changelog: ChangelogType
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
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Badge
              variant="outline"
              className="w-fit font-mono text-xs bg-linear-to-br from-muted to-background"
            >
              {changelog.version}
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">
              {changelog.date}
            </span>
          </div>
          <span className="text-xs font-mono text-muted-foreground tracking-wider">
            {changelog.project}
          </span>
        </div>

        <div>
          <h3 className="font-medium text-xl md:text-2xl mb-3">
            {changelog.title}
          </h3>
          <p className="font-mono text-muted-foreground text-sm leading-relaxed">
            {changelog.description}
          </p>
        </div>

        <ul className="space-y-2">
          {changelog.changes.map((change, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-sm font-mono text-muted-foreground"
            >
              <Check className="size-4 shrink-0 text-green-500" />
              {change}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const changelogs: ChangelogType[] = [
  {
    version: "v2.0.0",
    date: "March 4, 2026",
    project: "Hyepr Labs",
    title: "Marketing Layout Architecture & Performance",
    description:
      "Major architectural overhaul introducing a centralized marketing layout system, significantly reducing code duplication and improving maintainability across all pages.",
    changes: [
      "Implemented unified marketing layout with shared header and navigation.",
      "Refactored all marketing pages to use fragment-based composition.",
      "Optimized responsive breakpoints for mobile-first design approach.",
    ],
  },
  {
    version: "v1.3.0",
    date: "February 20, 2026",
    project: "Hyepr Labs",
    title: "Enhanced Theme System & UI Polish",
    description:
      "Introducing an animated theme switcher with system preference detection, along with refined UI components for a premium user experience.",
    changes: [
      "Added animated light, dark, and system theme toggle with smooth transitions.",
      "Refined DecorIcon and FullWidthDivider components for visual consistency.",
      "Improved gradient backgrounds and hover states across all card components.",
    ],
  },
  {
    version: "v1.2.0",
    date: "February 5, 2026",
    project: "Hyepr Labs",
    title: "Open Source Templates & Blog Section",
    description:
      "Launched our open source templates showcase featuring production-ready Next.js starter kits, alongside a redesigned blog section with category filtering.",
    changes: [
      "Built templates showcase with feature lists, pricing, and GitHub integration.",
      "Redesigned blog section with responsive 4-column grid layout.",
      "Added template preview images with hover zoom animations.",
    ],
  },
  {
    version: "v1.1.0",
    date: "January 15, 2026",
    project: "Hyepr Labs",
    title: "Team Profiles & Project Portfolio",
    description:
      "Introducing comprehensive team member profiles with social integrations and a curated project portfolio showcasing our design and development expertise.",
    changes: [
      "Added team section with avatars, roles, skills, and social links.",
      "Built project cards featuring logos, tags, and external links.",
      "Implemented consistent card hover effects with gradient overlays.",
    ],
  },
  {
    version: "v1.0.0",
    date: "January 1, 2026",
    project: "Hyepr Labs",
    title: "Initial Website Launch",
    description:
      "The official launch of Hyepr Labs website featuring a modern, responsive design built with Next.js, Tailwind CSS, and a custom component library.",
    changes: [
      "Launched animated hero section with call-to-action buttons.",
      "Built contact section with email, office, and phone information.",
      "Added legal pages including imprint, privacy policy, and terms of service.",
    ],
  },
];

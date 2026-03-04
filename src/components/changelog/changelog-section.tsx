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
    version: "v2.1.0",
    date: "March 4, 2026",
    project: "ClypAI",
    title: "Enhanced Analytics & Workflows",
    description:
      "This release introduces a brand new analytics dashboard and substantial improvements to our automated workflow builder for ClypAI.",
    changes: [
      "Introduced advanced chart types to the analytics dashboard.",
      "Workflow engine now runs 30% faster on large datasets.",
      "Resolved an issue where sidebar navigation could overlap on mobile.",
    ],
  },
  {
    version: "v2.0.5",
    date: "February 18, 2026",
    project: "Handle Lookup",
    title: "Security Patches & Minor Updates",
    description:
      "A minor release focused on under-the-hood optimization and resolving a few edge cases for Handle Lookup.",
    changes: [
      "Updated internal dependencies to their latest stable versions.",
      "Fixed a bug that caused intermittent logout issues for some users.",
      "Corrected typos in the settings billing page.",
    ],
  },
  {
    version: "v1.2.0",
    date: "January 10, 2026",
    project: "FlowLog",
    title: "Real-time Logging Updates",
    description:
      "Our biggest update yet for FlowLog. A complete rewrite of the core architecture bringing massive performance boosts and a fresh redesign.",
    changes: [
      "Fully redesigned interface with a modernized design system.",
      "New native desktop applications for macOS and Windows.",
      "Substantial architectural overhaul to support real-time logging collaboration features.",
    ],
  },
  {
    version: "v1.0.1",
    date: "December 15, 2025",
    project: "Unfollow Analyzer",
    title: "Initial Launch Fixes",
    description:
      "Minor adjustments and polish following the initial release of the Unfollow Analyzer tool.",
    changes: [
      "Added dark mode aesthetics for the main list view.",
      "Addressed an issue where pagination skipped results under heavy load.",
    ],
  },
];

import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

type ChangelogType = {
  version: string;
  date: string;
  project: string;
  title: string;
  description: string;
  changes: string[];
};

export async function ChangelogSection() {
  const t = await getTranslations("ChangelogSection");
  const changelogs = t.raw("entries") as ChangelogType[];

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
          <h3 className="line-clamp-2 font-medium text-xl md:text-2xl mb-3">
            {changelog.title}
          </h3>
          <p className="line-clamp-3 font-mono text-muted-foreground text-sm leading-relaxed">
            {changelog.description}
          </p>
        </div>

        <ul className="space-y-2">
          {changelog.changes.map((change, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm font-mono text-muted-foreground"
            >
              <Check className="size-4 shrink-0 mt-0.5 text-green-500" />
              {change}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

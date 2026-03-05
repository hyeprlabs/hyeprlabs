import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, BoxIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

type ProjectType = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  year: string;
  logo?: string;
};

const staticData: Array<{ link: string; year: string; logo?: string }> = [
  { link: "#", year: "2024" },
  { link: "#", year: "2023" },
  { link: "#", year: "2024" },
  { link: "#", year: "2023" },
];

export async function ProjectsList() {
  const t = await getTranslations("ProjectsList");
  const rawProjects = t.raw("projects") as Array<Pick<ProjectType, "title" | "description" | "tags">>;
  const projects: ProjectType[] = rawProjects.map((proj, i) => ({
    ...proj,
    ...staticData[i],
  }));

  return (
    <div className="mx-auto w-full max-w-5xl place-content-center space-y-12 mb-12 md:mb-36">
      <div className="relative grid grid-cols-1 gap-px bg-border md:grid-cols-2">
        <FullWidthDivider position="top" />
        {projects.map((project) => (
          <ProjectCard project={project} key={project.title} />
        ))}
        <FullWidthDivider position="bottom" />
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  project: ProjectType;
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-muted/50">
              {project.logo ? (
                <Image
                  src={project.logo}
                  alt={project.title}
                  className="size-full object-cover"
                  width={40}
                  height={40}
                />
              ) : (
                <BoxIcon className="size-5 text-muted-foreground" />
              )}
            </div>
            <span className="text-xs font-mono text-muted-foreground">
              {project.year}
            </span>
          </div>

          <Link href={project.link}>
            <Button variant="ghost" size="icon-sm" className="rounded-full border cursor-pointer">
              <ArrowUpRightIcon />
            </Button>
          </Link>
        </div>

        <div>
          <h3 className="line-clamp-2 font-medium text-xl md:text-2xl mb-2">
            {project.title}
          </h3>
          <p className="line-clamp-4 font-mono text-muted-foreground text-sm leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-mono bg-linear-to-br from-muted to-background">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, BoxIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type ProjectType = {
  title: string;
  description: string;
  tags: string[];
  link: string;
  year: string;
  logo?: string;
};

export function ProjectsList() {
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
          <h3 className="font-medium text-xl md:text-2xl mb-2">
            {project.title}
          </h3>
          <p className="font-mono text-muted-foreground text-sm leading-relaxed mb-6">
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

const projects: ProjectType[] = [
  {
    title: "E-Commerce Rebrand",
    description:
      "A complete overhaul of a legacy e-commerce platform, resulting in a 40% increase in conversion rates. We implemented a headless architecture for maximum flexibility.",
    tags: ["Next.js", "Shopify", "Tailwind CSS"],
    link: "#",
    year: "2024",
  },
  {
    title: "Fintech Dashboard",
    description:
      "Designed and developed a real-time analytics dashboard for a fintech startup. Features include live data visualization, secure user authentication, and report generation.",
    tags: ["React", "D3.js", "Node.js"],
    link: "#",
    year: "2023",
  },
  {
    title: "Health & Wellness App",
    description:
      "A cross-platform mobile application for tracking fitness and nutrition. Integrated with wearable devices to provide personalized health insights.",
    tags: ["React Native", "Firebase", "GraphQL"],
    link: "#",
    year: "2024",
  },
  {
    title: "Corporate Portfolio",
    description:
      "A minimalist portfolio site for an award-winning architecture firm. Focused on high-quality imagery and smooth micro-interactions to showcase their work.",
    tags: ["Astro", "Framer Motion", "Sanity CMS"],
    link: "#",
    year: "2023",
  },
];

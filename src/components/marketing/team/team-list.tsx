import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRightIcon,
  GithubIcon,
  LinkedinIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTranslations } from "next-intl/server";

type MemberType = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  link: string;
  avatar?: string;
  socials?: {
    x?: string;
    github?: string;
    linkedin?: string;
  };
};

const staticData: Array<Pick<MemberType, "link" | "avatar" | "socials">> = [
  { link: "#", socials: { x: "#", github: "#", linkedin: "#" } },
  { link: "#", socials: { x: "#", linkedin: "#" } },
  { link: "#", socials: { github: "#", linkedin: "#" } },
  { link: "#", socials: { x: "#", linkedin: "#" } },
];

export async function TeamList() {
  const t = await getTranslations("TeamList");
  const rawMembers = t.raw("members") as Array<Pick<MemberType, "name" | "role" | "bio" | "skills">>;
  const members: MemberType[] = rawMembers.map((member, i) => ({
    ...member,
    ...staticData[i],
  }));

  return (
    <div className="mx-auto w-full max-w-5xl place-content-center space-y-12 mb-12 md:mb-36">
      <div className="relative grid grid-cols-1 gap-px bg-border md:grid-cols-2">
        <FullWidthDivider position="top" />
        {members.map((member) => (
          <TeamMemberCard member={member} key={member.name} />
        ))}
        <FullWidthDivider position="bottom" />
      </div>
    </div>
  );
}

export function TeamMemberCard({
  member,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  member: MemberType;
}) {
  const initials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden bg-background p-6 md:p-8",
        "before:absolute before:inset-0 before:bg-linear-to-br before:from-muted before:to-background before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className,
      )}
      {...props}
    >
      <div className="relative z-10 flex flex-col gap-6 h-full">
        <div className="flex items-start justify-between">
          <Avatar className="size-16">
            {member.avatar && (
              <AvatarImage src={member.avatar} alt={member.name} />
            )}
            <AvatarFallback className="bg-transparent border font-mono">
              {initials(member.name)}
            </AvatarFallback>
          </Avatar>

          <Link href={member.link}>
            <Button
              variant="ghost"
              size="icon-sm"
              className="rounded-full border cursor-pointer"
            >
              <ArrowUpRightIcon />
            </Button>
          </Link>
        </div>

        <div>
          <h3 className="font-medium text-xl md:text-2xl mb-1">
            {member.name}
          </h3>
          <p className="font-mono text-xs text-muted-foreground uppercase mb-4">
            {member.role}
          </p>
          <p className="font-mono text-muted-foreground text-sm leading-relaxed">
            {member.bio}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="text-xs font-mono bg-linear-to-br from-muted to-background"
              >
                {skill}
              </Badge>
            ))}
          </div>

          {member.socials && (
            <div className="flex items-center gap-3 text-muted-foreground">
              {member.socials.x && (
                <Link
                  href={member.socials.x}
                  className="hover:text-foreground transition-colors"
                >
                  <XIcon className="size-4" />
                </Link>
              )}
              {member.socials.github && (
                <Link
                  href={member.socials.github}
                  className="hover:text-foreground transition-colors"
                >
                  <GithubIcon className="size-4" />
                </Link>
              )}
              {member.socials.linkedin && (
                <Link
                  href={member.socials.linkedin}
                  className="hover:text-foreground transition-colors"
                >
                  <LinkedinIcon className="size-4" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function XIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" />
    </svg>
  );
}

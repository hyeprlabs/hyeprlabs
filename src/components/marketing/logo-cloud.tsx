import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import Image from "next/image";

type Logo = {
  src: string;
  alt: string;
};

export function LogoCloud() {
  return (
    <div className="grid grid-cols-2 border md:grid-cols-4">
      <LogoCard
        className="relative border-r border-b bg-secondary dark:bg-secondary/30"
        logo={{
          src: "/clypai-logotype-light.svg",
          alt: "ClypAI Logo",
        }}
      >
        <DecorIcon className="z-10" position="bottom-right" />
      </LogoCard>

      <LogoCard
        className="border-b md:border-r"
        logo={{
          src: "/HandleLookup.svg",
          alt: "Handle Lookup Logo",
        }}
      />

      <LogoCard
        className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30"
        logo={{
          src: "/skillpot.svg",
          alt: "SkillPot Logo",
        }}
      >
        <DecorIcon className="z-10" position="bottom-right" />
        <DecorIcon className="z-10 hidden md:block" position="bottom-left" />
      </LogoCard>

      <LogoCard
        className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={{
          src: "/UnfollowAnalyzer.svg",
          alt: "Unfollow Analyzer Logo",
        }}
      />

      <LogoCard
        className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
      >
        <span className="text-muted-foreground font-mono text-sm">Coming Soon</span>
        <DecorIcon className="z-10 md:hidden" position="bottom-right" />
      </LogoCard>

      <LogoCard
        className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30"
      >
        <span className="text-muted-foreground font-mono text-sm">Coming Soon</span>
      </LogoCard>

      <LogoCard
        className="border-r"
      >
        <span className="text-muted-foreground font-mono text-sm">Coming Soon</span>
      </LogoCard>

      <LogoCard
        className="bg-secondary dark:bg-secondary/30"
      >
        <span className="text-muted-foreground font-mono text-sm">Coming Soon</span>
      </LogoCard>
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo?: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background px-4 py-8 md:p-8",
        className,
      )}
      {...props}
    >
      {logo ? (
        <Image
          alt={logo.alt}
          className="pointer-events-none select-none brightness-0 dark:brightness-100"
          style={{ height: "2.5rem", width: "auto" }}
          height={40}
          src={logo.src}
          width={200}
        />
      ) : null}
      {children}
    </div>
  );
}

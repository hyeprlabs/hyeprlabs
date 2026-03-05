import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "lucide-react";
import { HyeprLabsWordmark } from "@/components/marketing/brand/logos";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const currentYear = new Date().getFullYear();

export async function Footer() {
  const t = await getTranslations("Footer");

  const resources = [
    { title: t("nav.blog"), href: "/blog" },
    { title: t("nav.support"), href: "/support" },
    { title: t("nav.contact"), href: "/contact" },
    { title: t("nav.changelog"), href: "/changelog" },
    { title: t("nav.team"), href: "/team" },
  ];

  const company = [
    { title: t("nav.about"), href: "/about" },
    { title: t("nav.projects"), href: "/projects" },
    { title: t("nav.templates"), href: "/templates" },
    { title: t("nav.brandAssets"), href: "/brand" },
  ];

  const legal = [
    { title: t("nav.imprint"), href: "/legal/imprint" },
    { title: t("nav.privacyPolicy"), href: "/legal/privacy-policy" },
    { title: t("nav.termsOfService"), href: "/legal/terms-of-service" },
  ];

  return (
    <footer className="relative">
      <div
        className={cn(
          "mx-auto max-w-5xl",
          "dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)]",
        )}
      >
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="grid max-w-5xl grid-cols-6 gap-6 p-4">
          <div className="col-span-6 flex flex-col gap-4 pt-5 md:col-span-3">
            <Link className="w-max" href="/">
              <HyeprLabsWordmark className="h-5 w-auto" />
            </Link>
            <p className="max-w-sm text-balance text-muted-foreground text-sm font-mono">
              {t("tagline")}
            </p>
            <div className="flex gap-2">
              {links.map((item, index) => (
                <Button
                  asChild
                  key={`social-${item.link}-${index}`}
                  size="icon-sm"
                  variant="ghost"
                  className="rounded-full border"
                >
                  <a href={item.link} target="_blank">
                    {item.icon}
                  </a>
                </Button>
              ))}
            </div>
			<div>
			  <ThemeSwitcher />
			</div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">{t("resources")}</span>
            <div className="mt-2 flex flex-col gap-2">
              {resources.map(({ href, title }) => (
                <a
                  className="text-sm hover:underline hyphens-auto break-words"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">{t("company")}</span>
            <div className="mt-2 flex flex-col gap-2">
              {company.map(({ href, title }) => (
                <a
                  className="text-sm hover:underline hyphens-auto break-words"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-3 w-full md:col-span-1">
            <span className="text-muted-foreground text-xs">{t("legal")}</span>
            <div className="mt-2 flex flex-col gap-2">
              {legal.map(({ href, title }) => (
                <a
                  className="text-sm hover:underline hyphens-auto break-words"
                  href={href}
                  key={title}
                >
                  {title}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 h-px w-full bg-border" />
        <div className="flex max-w-4xl flex-col justify-between gap-2 py-4">
          <p className="text-center font-mono text-muted-foreground text-xs">
            {t("copyright", { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}

const links = [
  {
    icon: <GithubIcon />,
    link: "https://github.com/hyeprlabs",
  },
  {
    icon: <InstagramIcon />,
    link: "https://instagram.com/hyeprlabs",
  },
  {
    icon: <LinkedinIcon />,
    link: "https://linkedin.com/company/hyeprlabs",
  },
  {
    icon: <XIcon />,
    link: "https://x.com/hyeprlabs",
  },
  {
    icon: <YoutubeIcon />,
    link: "https://tiktok.com/@hyeprlabs",
  },
];

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

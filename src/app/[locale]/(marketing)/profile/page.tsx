import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { DecorIcon } from "@/components/ui/decor-icon";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { CallToAction } from "@/components/marketing/cta";
import { Footer } from "@/components/marketing/footer";
import { cn } from "@/lib/utils";
import { ShieldCheck, Mail, Calendar, Clock } from "lucide-react";

type StatItem = {
  icon: React.ElementType;
  label: string;
  value: string;
  highlight?: boolean;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Profile");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = (await currentUser())!;
  const t = await getTranslations("Profile");

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    t("heading");

  const initials = (() => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  })();

  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? "";

  const memberSince = new Date(user.createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const lastSignIn = user.lastSignInAt
    ? new Date(user.lastSignInAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const connectedAccounts = user.externalAccounts.length;

  const stats: StatItem[] = [
    {
      icon: Calendar,
      label: t("stats.memberSince"),
      value: memberSince,
    },
    ...(lastSignIn
      ? [{ icon: Clock, label: t("stats.lastSignIn"), value: lastSignIn }]
      : []),
    {
      icon: ShieldCheck,
      label: t("stats.twoFactor"),
      value: user.twoFactorEnabled
        ? t("stats.twoFactorEnabled")
        : t("stats.twoFactorDisabled"),
      highlight: user.twoFactorEnabled,
    },
    {
      icon: Mail,
      label: t("stats.connectedAccounts"),
      value:
        connectedAccounts > 0
          ? t("stats.connectedAccountsCount", { count: connectedAccounts })
          : t("stats.connectedAccountsNone"),
    },
  ];

  return (
    <>
      {/*
       * One continuous section — FullWidthDivider only at the very top and
       * very bottom of the entire block. Internal separators use plain
       * border-b / gap-px so there is never a doubled border line.
       */}
      <div className="mx-auto mb-12 w-full max-w-5xl md:mb-36">
        <div className="relative">
          {/* Outer edges */}
          <FullWidthDivider position="top" />
          <DecorIcon className="size-4" position="top-left" />
          <DecorIcon className="size-4" position="top-right" />

          {/* ── Identity ── */}
          <div className="flex flex-col gap-5 border-b border-border px-6 pt-12 pb-8 sm:flex-row sm:items-center sm:gap-6 md:px-8 md:pt-16 md:pb-10">
            <Avatar className="size-20 shrink-0 self-start sm:self-center">
              <AvatarImage src={user.imageUrl} alt={fullName} />
              <AvatarFallback className="border bg-transparent font-mono text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2">
              <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                {fullName}
              </h1>
              {primaryEmail && (
                <p className="font-mono text-sm text-muted-foreground">
                  {primaryEmail}
                </p>
              )}
              {user.username && (
                <Badge
                  variant="outline"
                  className="w-fit bg-linear-to-br from-muted to-background font-mono text-xs"
                >
                  @{user.username}
                </Badge>
              )}
            </div>
          </div>

          {/*
           * ── Stats grid ──
           * gap-px with bg-border background creates crisp 1-px separators
           * between cells without any outer border — no doubled lines.
           */}
          <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {stats.map(({ icon: Icon, label, value, highlight }) => (
              <div
                key={label}
                className="flex flex-col gap-1.5 bg-background p-4 md:p-5"
              >
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-wider">
                    {label}
                  </span>
                </div>
                <span
                  className={cn(
                    "font-mono text-sm",
                    highlight ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* ── Account settings ── */}
          <div className="border-t border-border p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="bg-linear-to-br from-muted to-background font-mono text-xs"
              >
                {t("badge")}
              </Badge>
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                {t("heading")}
              </h2>
            </div>
            <ProfileTabs />
          </div>

          <DecorIcon className="size-4" position="bottom-left" />
          <DecorIcon className="size-4" position="bottom-right" />
          <FullWidthDivider position="bottom" />
        </div>
      </div>

      <CallToAction />
      <Footer />
    </>
  );
}


import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MarketingHero } from "@/components/marketing/marketing-hero";
import { Footer } from "@/components/marketing/footer";
import { CallToAction } from "@/components/marketing/cta";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { DecorIcon } from "@/components/ui/decor-icon";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileTabs } from "@/components/profile/profile-tabs";
import { cn } from "@/lib/utils";
import { ShieldCheck, Mail, Calendar, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your Hyepr Labs account.",
};

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = (await currentUser())!;

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "Profile";

  const initials = (() => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  })();

  const primaryEmail =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? "";

  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const lastSignIn = user.lastSignInAt
    ? new Date(user.lastSignInAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const connectedAccounts = user.externalAccounts.length;

  const stats = [
    {
      icon: Calendar,
      label: "Member since",
      value: memberSince,
    },
    ...(lastSignIn
      ? [{ icon: Clock, label: "Last sign in", value: lastSignIn }]
      : []),
    {
      icon: ShieldCheck,
      label: "Two-factor auth",
      value: user.twoFactorEnabled ? "Enabled" : "Not enabled",
      highlight: user.twoFactorEnabled,
    },
    {
      icon: Mail,
      label: "Connected accounts",
      value: connectedAccounts > 0 ? `${connectedAccounts} connected` : "None",
    },
  ];

  return (
    <>
      <MarketingHero
        badge="Account"
        title={fullName}
        description={primaryEmail}
      />

      {/* Profile overview */}
      <section className="relative border-b border-border">
        <FullWidthDivider position="top" />
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          {/* User card */}
          <div className="relative mb-10 overflow-hidden rounded-lg border border-border bg-linear-to-br from-muted/50 to-background p-6 md:p-8">
            <DecorIcon className="size-4" position="top-left" />
            <DecorIcon className="size-4" position="top-right" />
            <DecorIcon className="size-4" position="bottom-left" />
            <DecorIcon className="size-4" position="bottom-right" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Avatar className="size-20 shrink-0 self-start sm:self-center">
                <AvatarImage src={user.imageUrl} alt={fullName} />
                <AvatarFallback className="border bg-transparent font-mono text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-2xl md:text-3xl">{fullName}</h2>
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
          </div>

          {/* Stats grid */}
          <div className="overflow-hidden rounded-lg border border-border">
            <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-4">
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
          </div>
        </div>
        <FullWidthDivider position="bottom" />
      </section>

      {/* Account settings */}
      <section className="relative border-b border-border">
        <FullWidthDivider position="top" />
        <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
          <div className="mb-8 text-center">
            <Badge
              variant="outline"
              className="mb-4 bg-linear-to-br from-muted to-background font-mono"
            >
              Settings
            </Badge>
            <h2 className="text-balance font-serif text-2xl md:text-3xl">
              Account settings
            </h2>
            <p className="mt-2 font-mono text-sm text-muted-foreground">
              Update your profile and manage your security settings.
            </p>
          </div>
          <ProfileTabs />
        </div>
        <FullWidthDivider position="bottom" />
      </section>

      <CallToAction />
      <Footer />
    </>
  );
}

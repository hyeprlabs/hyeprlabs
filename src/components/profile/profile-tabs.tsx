"use client";

import { useEffect, useRef, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  CheckCircle2,
  Loader2,
  LogOut,
  Mail,
  Shield,
  User,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function providerLabel(provider: string): string {
  const map: Record<string, string> = {
    google: "Google",
    github: "GitHub",
    apple: "Apple",
    facebook: "Facebook",
    microsoft: "Microsoft",
    discord: "Discord",
    twitter: "X / Twitter",
    x: "X / Twitter",
  };
  return map[provider.toLowerCase()] ?? provider;
}

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

function SectionCard({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {heading}
        </p>
      </div>
      {children}
    </div>
  );
}

function SettingRow({
  label,
  htmlFor,
  description,
  control,
}: {
  label: string;
  htmlFor?: string;
  description?: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center">
      <div className="flex-1">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        {description && (
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="sm:w-64">{control}</div>
    </div>
  );
}

function DisplayRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function ProfileTabsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-11 w-full rounded-none border-b border-border">
        <Skeleton className="h-full w-40 rounded-none" />
      </div>
      <div className="space-y-4 py-4">
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ProfileTabs() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const t = useTranslations("Profile");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const initialized = useRef(false);

  // Populate form once user data is available
  useEffect(() => {
    if (isLoaded && user && !initialized.current) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      initialized.current = true;
    }
  }, [isLoaded, user]);

  if (!isLoaded || !user) {
    return <ProfileTabsSkeleton />;
  }

  const primaryEmailAddress =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? "";

  const isDirty =
    firstName !== (user.firstName ?? "") ||
    lastName !== (user.lastName ?? "");

  async function handleSave() {
    if (!user) return;
    setIsSaving(true);
    try {
      await user.update({ firstName: firstName.trim(), lastName: lastName.trim() });
      toast.success(t("toast.saveSuccess"));
    } catch {
      toast.error(t("toast.saveError"));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut();
      router.push("/");
    } catch {
      toast.error(t("toast.signOutError"));
    }
  }

  return (
    <Tabs defaultValue="profile" className="gap-0">
      {/* Tab navigation */}
      <TabsList
        variant="line"
        className="h-11 w-full justify-start gap-0 rounded-none border-b border-border p-0"
      >
        <TabsTrigger
          value="profile"
          className="h-full gap-1.5 rounded-none px-4 font-mono text-xs uppercase tracking-wider"
        >
          <User className="size-3.5" />
          {t("tabs.profile")}
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="h-full gap-1.5 rounded-none px-4 font-mono text-xs uppercase tracking-wider"
        >
          <Shield className="size-3.5" />
          {t("tabs.security")}
        </TabsTrigger>
      </TabsList>

      {/* Profile tab */}
      <TabsContent value="profile" className="mt-6 space-y-4">
        <SectionCard heading={t("sections.personalInfo")}>
          <div className="divide-y divide-border">
            <SettingRow
              label={t("fields.firstName")}
              htmlFor="profile-first-name"
              description={t("fields.firstNameDesc")}
              control={
                <Input
                  id="profile-first-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder={t("fields.firstNamePlaceholder")}
                  autoComplete="given-name"
                />
              }
            />
            <SettingRow
              label={t("fields.lastName")}
              htmlFor="profile-last-name"
              description={t("fields.lastNameDesc")}
              control={
                <Input
                  id="profile-last-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder={t("fields.lastNamePlaceholder")}
                  autoComplete="family-name"
                />
              }
            />
            <SettingRow
              label={t("fields.email")}
              description={t("fields.emailDesc")}
              control={
                <Input
                  value={primaryEmailAddress}
                  readOnly
                  disabled
                  aria-label={t("fields.emailReadOnly")}
                />
              }
            />
          </div>
          {/* Card footer */}
          <div className="flex items-center justify-end border-t border-border bg-muted/20 px-4 py-3">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              className="bg-linear-to-br from-foreground to-muted-foreground"
            >
              {isSaving && <Loader2 className="animate-spin" />}
              {t("actions.saveChanges")}
            </Button>
          </div>
        </SectionCard>
      </TabsContent>

      {/* Security tab */}
      <TabsContent value="security" className="mt-6 space-y-4">
        {/* Email addresses */}
        <SectionCard heading={t("sections.emailAddresses")}>
          {user.emailAddresses.length > 0 ? (
            <div className="divide-y divide-border">
              {user.emailAddresses.map((email) => (
                <div
                  key={email.id}
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Mail
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="truncate font-mono text-sm">
                      {email.emailAddress}
                    </span>
                  </div>
                  {email.id === user.primaryEmailAddressId && (
                    <Badge
                      variant="outline"
                      className="ml-3 shrink-0 bg-linear-to-br from-muted to-background font-mono text-xs"
                    >
                      {t("badges.primary")}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="px-4 py-4 font-mono text-xs text-muted-foreground">
              {t("empty.noEmails")}
            </p>
          )}
        </SectionCard>

        {/* Connected accounts (OAuth) */}
        <SectionCard heading={t("sections.connectedAccounts")}>
          {user.externalAccounts.length > 0 ? (
            <div className="divide-y divide-border">
              {user.externalAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center gap-3 px-4 py-3"
                >
                  <span className="flex-1 font-mono text-sm">
                    {providerLabel(account.provider)}
                  </span>
                  {account.username && (
                    <span className="truncate font-mono text-xs text-muted-foreground">
                      @{account.username}
                    </span>
                  )}
                  {account.emailAddress && !account.username && (
                    <span className="truncate font-mono text-xs text-muted-foreground">
                      {account.emailAddress}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="px-4 py-4 font-mono text-xs text-muted-foreground">
              {t("empty.noConnectedAccounts")}
            </p>
          )}
        </SectionCard>

        {/* Two-factor authentication */}
        <SectionCard heading={t("sections.twoFactor")}>
          <DisplayRow
            label={t("sections.twoFactor")}
            description={
              user.twoFactorEnabled
                ? t("stats.twoFactorEnabled")
                : t("stats.twoFactorDisabled")
            }
          >
            {user.twoFactorEnabled ? (
              <Badge
                variant="outline"
                className="gap-1.5 bg-linear-to-br from-muted to-background font-mono text-xs"
              >
                <CheckCircle2 className="size-3 text-green-500" />
                {t("badges.twoFactorEnabled")}
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="gap-1.5 bg-linear-to-br from-muted to-background font-mono text-xs"
              >
                <XCircle className="size-3 text-muted-foreground" />
                {t("badges.twoFactorDisabled")}
              </Badge>
            )}
          </DisplayRow>
        </SectionCard>

        {/* Session / sign out */}
        <SectionCard heading={t("sections.session")}>
          <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                {t("actions.signOut")}
              </p>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                {t("actions.signOutDesc")}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="shrink-0 gap-2 font-mono text-xs"
            >
              <LogOut className="size-3.5" />
              {t("actions.signOut")}
            </Button>
          </div>
        </SectionCard>
      </TabsContent>
    </Tabs>
  );
}

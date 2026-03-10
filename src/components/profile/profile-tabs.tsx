"use client";

import { useEffect, useRef, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
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
import { Spinner } from "@/components/ui/spinner";
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
// Sub-components
// ---------------------------------------------------------------------------

function SectionCard({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <div className="border-b border-border bg-muted/30 px-4 py-2.5">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {heading}
        </p>
      </div>
      {children}
    </div>
  );
}

function FieldRow({
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
    <div className="grid gap-3 px-4 py-3.5 sm:grid-cols-[1fr_16rem]">
      <div>
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium leading-none text-foreground"
        >
          {label}
        </label>
        {description && (
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div>{control}</div>
    </div>
  );
}

function InfoRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ProfileTabs() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const t = useTranslations("Profile");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (isLoaded && user && !initialized.current) {
      setFirstName(user.firstName ?? "");
      setLastName(user.lastName ?? "");
      setUsername(user.username ?? "");
      initialized.current = true;
    }
  }, [isLoaded, user]);

  if (!isLoaded || !user) {
    return (
      <div className="flex min-h-[12rem] items-center justify-center">
        <Spinner className="size-5 text-muted-foreground" />
      </div>
    );
  }

  const primaryEmailAddress =
    user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? "";

  const isDirty =
    firstName !== (user.firstName ?? "") ||
    lastName !== (user.lastName ?? "") ||
    (user.username !== null && username !== (user.username ?? ""));

  async function handleSave() {
    if (!user) return;
    setIsSaving(true);
    try {
      const updates: Parameters<typeof user.update>[0] = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      };
      // Pass null to Clerk to clear the username when the field is emptied;
      // undefined leaves the field unchanged.
      if (user.username !== null) {
        updates.username = username.trim() !== "" ? username.trim() : null;
      }
      await user.update(updates);
      toast.success(t("toast.saveSuccess"));
    } catch {
      toast.error(t("toast.saveError"));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSignOut() {
    try {
      await signOut({ redirectUrl: "/" });
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

      {/* ── Profile tab ── */}
      <TabsContent value="profile" className="mt-6 space-y-3">
        <SectionCard heading={t("sections.personalInfo")}>
          <div className="divide-y divide-border">
            <FieldRow
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
            <FieldRow
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
            {user.username !== null && (
              <FieldRow
                label={t("fields.username")}
                htmlFor="profile-username"
                description={t("fields.usernameDesc")}
                control={
                  <Input
                    id="profile-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("fields.usernamePlaceholder")}
                    autoComplete="username"
                    className="font-mono"
                  />
                }
              />
            )}
            <FieldRow
              label={t("fields.email")}
              description={t("fields.emailDesc")}
              control={
                <Input
                  value={primaryEmailAddress}
                  readOnly
                  disabled
                  aria-label={t("fields.emailReadOnly")}
                  className="font-mono"
                />
              }
            />
          </div>

          <div className="flex items-center justify-end border-t border-border bg-muted/20 px-4 py-3">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !isDirty}
              className="min-w-[6.5rem] gap-1.5 bg-linear-to-br from-foreground to-muted-foreground"
            >
              {isSaving ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  {t("actions.saving")}
                </>
              ) : (
                t("actions.saveChanges")
              )}
            </Button>
          </div>
        </SectionCard>
      </TabsContent>

      {/* ── Security tab ── */}
      <TabsContent value="security" className="mt-6 space-y-3">
        {/* Email addresses */}
        <SectionCard heading={t("sections.emailAddresses")}>
          {user.emailAddresses.length > 0 ? (
            <div className="divide-y divide-border">
              {user.emailAddresses.map((email) => (
                <div
                  key={email.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Mail
                      className="size-3.5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span className="truncate font-mono text-sm">
                      {email.emailAddress}
                    </span>
                  </div>
                  {email.id === user.primaryEmailAddressId && (
                    <Badge
                      variant="outline"
                      className="shrink-0 bg-linear-to-br from-muted to-background font-mono text-xs"
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

        {/* Connected social accounts */}
        <SectionCard heading={t("sections.connectedAccounts")}>
          {user.externalAccounts.length > 0 ? (
            <div className="divide-y divide-border">
              {user.externalAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between gap-3 px-4 py-3"
                >
                  <span className="font-mono text-sm">
                    {providerLabel(account.provider)}
                  </span>
                  <span className="truncate font-mono text-xs text-muted-foreground">
                    {account.username
                      ? `@${account.username}`
                      : account.emailAddress}
                  </span>
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
          <InfoRow
            label={t("sections.twoFactor")}
            description={
              user.twoFactorEnabled
                ? t("twoFactor.enabledDesc")
                : t("twoFactor.disabledDesc")
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
                className="gap-1.5 bg-linear-to-br from-muted to-background font-mono text-xs text-muted-foreground"
              >
                <XCircle className="size-3" />
                {t("badges.twoFactorDisabled")}
              </Badge>
            )}
          </InfoRow>
        </SectionCard>

        {/* Sign out */}
        <SectionCard heading={t("sections.session")}>
          <InfoRow
            label={t("actions.signOut")}
            description={t("actions.signOutDesc")}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="shrink-0 gap-1.5 font-mono text-xs"
            >
              <LogOut className="size-3.5" />
              {t("actions.signOut")}
            </Button>
          </InfoRow>
        </SectionCard>
      </TabsContent>
    </Tabs>
  );
}

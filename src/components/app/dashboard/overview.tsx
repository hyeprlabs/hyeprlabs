"use client"

import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { DecorIcon } from "@/components/ui/decor-icon"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Badge } from "@/components/ui/badge"

export function DashboardOverview() {
  const { isSignedIn, user } = useUser()
  const t = useTranslations("DashboardOverviewSection")

  if (!isSignedIn) return null

  const email = user.primaryEmailAddress?.emailAddress
  const emailVerified = user.primaryEmailAddress?.verification?.status === "verified"

  const createdAt = user.createdAt
    ? new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long", day: "numeric" }).format(new Date(user.createdAt))
    : "—"

  const lastSignIn = user.lastSignInAt
    ? new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "numeric" }).format(new Date(user.lastSignInAt))
    : "—"

  const rows = [
    { label: t("email"), value: email ?? "—", mono: true },
    { label: t("emailStatus"), value: emailVerified ? t("verified") : t("unverified"), badge: emailVerified ? "green" : "yellow" },
    { label: t("memberSince"), value: createdAt },
    { label: t("lastSignIn"), value: lastSignIn },
  ]

  return (
    <section className="relative px-6 pb-14 pt-6">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <FullWidthDivider position="top" />

      <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t("heading")}
      </h2>

      <div className="flex flex-col divide-y divide-border">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-8 py-4">
            <span className="shrink-0 text-sm text-muted-foreground">{row.label}</span>
            {row.badge ? (
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  row.badge === "green" && "border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400",
                  row.badge === "yellow" && "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                )}
              >
                {row.value}
              </Badge>
            ) : (
              <span className={cn("text-sm", row.mono ? "font-mono" : "font-medium")}>{row.value}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

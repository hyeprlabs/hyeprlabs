"use client"

import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { DecorIcon } from "@/components/ui/decor-icon"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Badge } from "@/components/ui/badge"

const PROVIDER_LABELS: Record<string, string> = {
  github: "GitHub",
  google: "Google",
  discord: "Discord",
  twitter: "Twitter / X",
  facebook: "Facebook",
  apple: "Apple",
  microsoft: "Microsoft",
  linkedin: "LinkedIn",
  gitlab: "GitLab",
  bitbucket: "Bitbucket",
}

export function ProfileConnectedAccounts() {
  const { isSignedIn, user } = useUser()
  const t = useTranslations("ProfileConnectedSection")

  if (!isSignedIn || user.externalAccounts.length === 0) return null

  return (
    <section className="relative px-6 pb-14 pt-6">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <FullWidthDivider position="top" />

      <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t("heading")}
      </h2>

      <div className="flex flex-col divide-y divide-border">
        {user.externalAccounts.map((account) => {
          const label = PROVIDER_LABELS[account.provider] ?? account.provider
          const display = account.username || account.emailAddress || "—"
          return (
            <div key={account.id} className="flex items-center justify-between gap-4 py-4">
              <div className="flex min-w-0 flex-col gap-0.5">
                <span className="text-sm font-medium">{label}</span>
                <span className="truncate text-xs text-muted-foreground">{display}</span>
              </div>
              <Badge
                variant="outline"
                className="shrink-0 border-green-500/40 bg-green-500/10 text-xs text-green-600 dark:text-green-400"
              >
                {t("connected")}
              </Badge>
            </div>
          )
        })}
      </div>
    </section>
  )
}

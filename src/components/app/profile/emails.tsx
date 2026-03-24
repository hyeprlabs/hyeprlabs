"use client"

import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { DecorIcon } from "@/components/ui/decor-icon"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Badge } from "@/components/ui/badge"

export function ProfileEmails() {
  const { isSignedIn, user } = useUser()
  const t = useTranslations("ProfileEmailsSection")

  if (!isSignedIn) return null

  return (
    <section className="relative px-6 pb-14 pt-6">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <FullWidthDivider position="top" />

      <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t("heading")}
      </h2>

      <div className="flex flex-col divide-y divide-border">
        {user.emailAddresses.map((addr) => {
          const isPrimary = addr.id === user.primaryEmailAddressId
          const verified = addr.verification?.status === "verified"
          return (
            <div key={addr.id} className="flex items-center justify-between gap-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="truncate text-sm">{addr.emailAddress}</span>
                {isPrimary && (
                  <Badge variant="outline" className="shrink-0 text-xs text-muted-foreground">
                    {t("primary")}
                  </Badge>
                )}
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "shrink-0 text-xs",
                  verified
                    ? "border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400"
                    : "border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
                )}
              >
                {verified ? t("verified") : t("unverified")}
              </Badge>
            </div>
          )
        })}
      </div>
    </section>
  )
}

"use client"

import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { DecorIcon } from "@/components/ui/decor-icon"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"

export function DashboardQuickActions() {
  const { isSignedIn } = useUser()
  const t = useTranslations("DashboardActionsSection")

  if (!isSignedIn) return null

  const actions = [
    { href: "/app/profile" as const, title: t("editProfile"), description: t("editProfileDesc") },
    { href: "/contact" as const, title: t("support"), description: t("supportDesc") },
  ]

  return (
    <section className="relative px-6 pb-40 pt-6">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <FullWidthDivider position="top" />

      <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t("heading")}
      </h2>

      <div className="flex flex-col divide-y divide-border">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-foreground"
          >
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">{action.title}</span>
              <span className="text-xs text-muted-foreground">{action.description}</span>
            </div>
            <ArrowRight className="size-4 shrink-0 -translate-x-1 text-muted-foreground opacity-0 transition-all duration-150 group-hover:translate-x-0 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </section>
  )
}

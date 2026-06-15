"use client"

import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"

interface AppHeroProps {
  mode: "dashboard" | "profile"
}

function useGreeting() {
  const t = useTranslations("AppHero")
  const hour = new Date().getHours()
  if (hour < 12) return t("morning")
  if (hour < 18) return t("afternoon")
  return t("evening")
}

export function AppHero({ mode }: AppHeroProps) {
  const { isLoaded, isSignedIn, user } = useUser()
  const tDash = useTranslations("DashboardPage")
  const tProfile = useTranslations("ProfilePage")
  const greeting = useGreeting()

  if (!isLoaded) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-foreground" />
      </div>
    )
  }

  if (!isSignedIn) {
    const t = mode === "dashboard" ? tDash : tProfile
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="text-sm text-muted-foreground">{t("notSignedIn")}</p>
          <Button asChild>
            <Link href="/sign-in">{t("signIn")} <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </div>
    )
  }

  const fullName = user.fullName || user.username || ""
  const email = user.primaryEmailAddress?.emailAddress
  const initials =
    [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join("") ||
    user.username?.[0]?.toUpperCase() ||
    "?"

  const subtitle = mode === "dashboard" ? tDash("subtitle") : email

  return (
    <section className="flex flex-col items-center gap-5 py-16 text-center md:py-24">
      <Avatar className="size-14 ring-1 ring-border ring-offset-4 ring-offset-background">
        <AvatarImage src={user.imageUrl} alt={fullName} />
        <AvatarFallback className="font-mono text-base">{initials}</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-2 px-6">
        <h1 className="font-serif text-3xl md:text-4xl">
          {greeting}, {user.firstName || user.username}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </section>
  )
}

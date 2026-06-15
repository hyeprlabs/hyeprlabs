"use client"

import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { DecorIcon } from "@/components/ui/decor-icon"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function ProfileDeleteAccount() {
  const { isSignedIn, user } = useUser()
  const t = useTranslations("ProfileDeleteSection")
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  if (!isSignedIn) return null

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await user.delete()
      router.push("/")
    } catch {
      toast.error(t("errorToast"))
      setDeleting(false)
    }
  }

  return (
    <section className="relative px-6 pb-40 pt-6">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <FullWidthDivider position="top" />

      <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-destructive">
        {t("heading")}
      </h2>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex max-w-md flex-col gap-1.5">
          <p className="text-sm font-medium">{t("title")}</p>
          <p className="text-sm leading-relaxed text-muted-foreground">{t("description")}</p>
        </div>
        {!confirming ? (
          <Button variant="destructive" className="shrink-0" onClick={() => setConfirming(true)}>
            {t("delete")}
          </Button>
        ) : (
          <div className="flex shrink-0 items-center gap-2">
            <Button variant="ghost" onClick={() => setConfirming(false)} disabled={deleting}>{t("cancel")}</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? t("deleting") : t("confirm")}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

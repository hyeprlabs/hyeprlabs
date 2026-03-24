"use client"

import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { useState, useEffect } from "react"
import { DecorIcon } from "@/components/ui/decor-icon"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function ProfileEditName() {
  const { isSignedIn, user } = useUser()
  const t = useTranslations("ProfileNameSection")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName ?? "")
      setLastName(user.lastName ?? "")
      setUsername(user.username ?? "")
    }
  }, [user?.id]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!isSignedIn) return null

  const hasChanges =
    firstName.trim() !== (user.firstName ?? "") ||
    lastName.trim() !== (user.lastName ?? "") ||
    username.trim() !== (user.username ?? "")

  const handleSave = async () => {
    setSaving(true)
    try {
      const update: Parameters<typeof user.update>[0] = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      }
      if (user.username !== undefined) update.username = username.trim() || undefined
      await user.update(update)
      toast.success(t("successToast"))
    } catch {
      toast.error(t("errorToast"))
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="relative px-6 pb-14 pt-6">
      <DecorIcon className="size-4" position="top-left" />
      <DecorIcon className="size-4" position="top-right" />
      <FullWidthDivider position="top" />

      <h2 className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t("heading")}
      </h2>

      <div className="flex flex-wrap items-end gap-4">
        <div className="flex min-w-[160px] flex-1 flex-col gap-2">
          <Label htmlFor="firstName" className="text-sm text-muted-foreground">{t("firstName")}</Label>
          <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={t("firstName")} className="h-11" />
        </div>
        <div className="flex min-w-[160px] flex-1 flex-col gap-2">
          <Label htmlFor="lastName" className="text-sm text-muted-foreground">{t("lastName")}</Label>
          <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={t("lastName")} className="h-11" />
        </div>
        {user.username !== undefined && (
          <div className="flex min-w-[160px] flex-1 flex-col gap-2">
            <Label htmlFor="username" className="text-sm text-muted-foreground">{t("username")}</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t("username")} className="h-11" />
          </div>
        )}
        <Button onClick={handleSave} disabled={saving || !hasChanges} className="h-11 shrink-0 self-end px-6">
          {saving ? t("saving") : t("save")}
        </Button>
      </div>
    </section>
  )
}

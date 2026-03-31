"use client"

import { useUser } from "@clerk/nextjs"
import { useTranslations } from "next-intl"
import { useRef, useState } from "react"
import { DecorIcon } from "@/components/ui/decor-icon"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CameraIcon } from "lucide-react"

export function ProfileAvatarEdit() {
  const { isSignedIn, user } = useUser()
  const t = useTranslations("ProfileAvatarSection")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  if (!isSignedIn) return null

  const initials =
    [user.firstName?.[0], user.lastName?.[0]].filter(Boolean).join("") ||
    user.username?.[0]?.toUpperCase() ||
    "?"

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      await user.setProfileImage({ file })
      toast.success(t("successToast"))
    } catch {
      toast.error(t("errorToast"))
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
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

      <div className="flex items-center gap-6">
        <Avatar className="size-16 shrink-0 ring-1 ring-border ring-offset-4 ring-offset-background">
          <AvatarImage src={user.imageUrl} alt={user.fullName ?? "Avatar"} />
          <AvatarFallback className="font-mono">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-fit"
          >
            <CameraIcon className="size-4" />
            {uploading ? t("uploading") : t("changePhoto")}
          </Button>
          <p className="text-xs text-muted-foreground">{t("hint")}</p>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
    </section>
  )
}

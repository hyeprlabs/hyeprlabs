"use client"

import { useState, type FormEvent } from "react"
import { useSignIn } from "@clerk/nextjs/legacy"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "@/i18n/navigation"
import { GoogleLogo } from "@/components/auth/google-logo"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { signIn, setActive, isLoaded } = useSignIn()
  const t = useTranslations("SignIn")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLoaded) return

    setIsSubmitting(true)

    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
      }
    } catch (err: unknown) {
      const clerkError = err as {
        errors?: Array<{ longMessage?: string; message?: string }>
      }
      const msg =
        clerkError?.errors?.[0]?.longMessage ??
        clerkError?.errors?.[0]?.message ??
        t("error.generic")
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    if (!isLoaded) return
    setIsGoogleLoading(true)
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/profile",
      })
    } catch (err: unknown) {
      const clerkError = err as {
        errors?: Array<{ longMessage?: string; message?: string }>
      }
      const msg =
        clerkError?.errors?.[0]?.longMessage ??
        clerkError?.errors?.[0]?.message ??
        t("error.generic")
      toast.error(msg)
      setIsGoogleLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      noValidate
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-balance text-sm text-muted-foreground">
            {t("description")}
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="login-email">{t("email")}</FieldLabel>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting || isGoogleLoading}
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="login-password">{t("password")}</FieldLabel>
            <Link
              href="/forgot-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            placeholder={t("passwordPlaceholder")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting || isGoogleLoading}
          />
        </Field>
        <Field>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isGoogleLoading || !isLoaded}
          >
            {isSubmitting && (
              <Loader2 className="animate-spin" aria-hidden="true" />
            )}
            {t("submit")}
          </Button>
        </Field>
        <FieldSeparator>{t("orContinueWith")}</FieldSeparator>
        <Field>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting || isGoogleLoading || !isLoaded}
          >
            {isGoogleLoading ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <GoogleLogo className="size-4" />
            )}
            {t("continueWithGoogle")}
          </Button>
          <FieldDescription className="text-center">
            {t("noAccount")}{" "}
            <Link href="/sign-up" className="underline underline-offset-4">
              {t("signUp")}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

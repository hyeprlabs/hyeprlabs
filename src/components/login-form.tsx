"use client"

import { useState } from "react"
import { useSignIn } from "@clerk/nextjs/legacy"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { signInSchema, type SignInValues } from "@/lib/auth-schemas"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link } from "@/i18n/navigation"
import { GoogleLogo } from "@/components/auth/google-logo"

type FieldErrors = Partial<Record<keyof SignInValues, string>>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { signIn, setActive, isLoaded } = useSignIn()
  const t = useTranslations("SignIn")
  const tV = useTranslations("SignIn.validation")

  const [values, setValues] = useState<SignInValues>({ email: "", password: "" })
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  function set<K extends keyof SignInValues>(key: K, value: SignInValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    // Clear the field error as the user types
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function validate(): boolean {
    const result = signInSchema.safeParse(values)
    if (result.success) {
      setFieldErrors({})
      return true
    }
    const errors: FieldErrors = {}
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof SignInValues
      if (!errors[key]) {
        // issue.message is a translation key like "validation.emailRequired"
        errors[key] = tV(issue.message as Parameters<typeof tV>[0])
      }
    }
    setFieldErrors(errors)
    return false
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLoaded) return
    if (!validate()) return

    setIsSubmitting(true)

    try {
      const result = await signIn.create({
        identifier: values.email.trim(),
        password: values.password,
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

  const busy = isSubmitting || isGoogleLoading || !isLoaded

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

        <Field data-invalid={!!fieldErrors.email || undefined}>
          <FieldLabel htmlFor="login-email">{t("email")}</FieldLabel>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
            disabled={busy}
          />
          {fieldErrors.email && (
            <FieldError id="login-email-error">{fieldErrors.email}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!fieldErrors.password || undefined}>
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
            value={values.password}
            onChange={(e) => set("password", e.target.value)}
            aria-invalid={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? "login-password-error" : undefined}
            disabled={busy}
          />
          {fieldErrors.password && (
            <FieldError id="login-password-error">{fieldErrors.password}</FieldError>
          )}
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={busy}>
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
            disabled={busy}
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


"use client"

import { useState } from "react"
import { useSignUp } from "@clerk/nextjs/legacy"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { Loader2, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { signUpSchema, verifyCodeSchema, type SignUpValues, type VerifyCodeValues } from "@/lib/auth-schemas"
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

type RegisterErrors = Partial<Record<keyof SignUpValues, string>>
type VerifyErrors = Partial<Record<keyof VerifyCodeValues, string>>

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { signUp, setActive, isLoaded } = useSignUp()
  const t = useTranslations("SignUp")
  const tV = useTranslations("SignUp.validation")

  const [values, setValues] = useState<SignUpValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [code, setCode] = useState("")
  const [fieldErrors, setFieldErrors] = useState<RegisterErrors>({})
  const [verifyErrors, setVerifyErrors] = useState<VerifyErrors>({})
  const [step, setStep] = useState<"register" | "verify">("register")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  function set<K extends keyof SignUpValues>(key: K, value: SignUpValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
    if (fieldErrors[key]) {
      setFieldErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  function validateRegister(): boolean {
    const result = signUpSchema.safeParse(values)
    if (result.success) {
      setFieldErrors({})
      return true
    }
    const errors: RegisterErrors = {}
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof SignUpValues
      if (!errors[key]) {
        errors[key] = tV(issue.message as Parameters<typeof tV>[0])
      }
    }
    setFieldErrors(errors)
    return false
  }

  function validateCode(): boolean {
    const result = verifyCodeSchema.safeParse({ code })
    if (result.success) {
      setVerifyErrors({})
      return true
    }
    const errors: VerifyErrors = {}
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof VerifyCodeValues
      if (!errors[key]) {
        errors[key] = tV(issue.message as Parameters<typeof tV>[0])
      }
    }
    setVerifyErrors(errors)
    return false
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLoaded) return
    if (!validateRegister()) return

    setIsSubmitting(true)

    try {
      await signUp.create({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        emailAddress: values.email.trim(),
        password: values.password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
      setStep("verify")
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

  async function handleVerify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLoaded) return
    if (!validateCode()) return

    setIsSubmitting(true)

    try {
      const result = await signUp.attemptEmailAddressVerification({ code })

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

  async function handleGoogleSignUp() {
    if (!isLoaded) return
    setIsGoogleLoading(true)
    try {
      await signUp.authenticateWithRedirect({
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

  if (step === "verify") {
    return (
      <form
        onSubmit={handleVerify}
        className={cn("flex flex-col gap-6", className)}
        noValidate
        {...props}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-10 items-center justify-center rounded-full border border-border bg-muted/50">
              <Mail className="size-5 text-muted-foreground" aria-hidden="true" />
            </div>
            <h1 className="text-2xl font-bold">{t("verifyTitle")}</h1>
            <p className="text-balance text-sm text-muted-foreground">
              {t("verifyDescription", { email: values.email })}
            </p>
          </div>

          <Field data-invalid={!!verifyErrors.code || undefined}>
            <FieldLabel htmlFor="verify-code">{t("verifyCode")}</FieldLabel>
            <Input
              id="verify-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder={t("verifyCodePlaceholder")}
              value={code}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "")
                setCode(val)
                if (verifyErrors.code) setVerifyErrors({})
              }}
              maxLength={6}
              aria-invalid={!!verifyErrors.code}
              aria-describedby={verifyErrors.code ? "verify-code-error" : undefined}
              disabled={isSubmitting}
              className="text-center font-mono tracking-[0.4em]"
            />
            {verifyErrors.code && (
              <FieldError id="verify-code-error">{verifyErrors.code}</FieldError>
            )}
          </Field>

          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !isLoaded}
            >
              {isSubmitting && (
                <Loader2 className="animate-spin" aria-hidden="true" />
              )}
              {t("verifySubmit")}
            </Button>
            <FieldDescription className="text-center">
              <button
                type="button"
                onClick={() => {
                  setStep("register")
                  setCode("")
                  setVerifyErrors({})
                }}
                className="underline underline-offset-4"
              >
                {t("backToRegister")}
              </button>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    )
  }

  return (
    <form
      onSubmit={handleRegister}
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

        <div className="grid grid-cols-2 gap-4">
          <Field data-invalid={!!fieldErrors.firstName || undefined}>
            <FieldLabel htmlFor="signup-first-name">{t("firstName")}</FieldLabel>
            <Input
              id="signup-first-name"
              type="text"
              autoComplete="given-name"
              placeholder={t("firstNamePlaceholder")}
              value={values.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              aria-invalid={!!fieldErrors.firstName}
              aria-describedby={fieldErrors.firstName ? "signup-first-name-error" : undefined}
              disabled={busy}
            />
            {fieldErrors.firstName && (
              <FieldError id="signup-first-name-error">{fieldErrors.firstName}</FieldError>
            )}
          </Field>

          <Field data-invalid={!!fieldErrors.lastName || undefined}>
            <FieldLabel htmlFor="signup-last-name">{t("lastName")}</FieldLabel>
            <Input
              id="signup-last-name"
              type="text"
              autoComplete="family-name"
              placeholder={t("lastNamePlaceholder")}
              value={values.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              aria-invalid={!!fieldErrors.lastName}
              aria-describedby={fieldErrors.lastName ? "signup-last-name-error" : undefined}
              disabled={busy}
            />
            {fieldErrors.lastName && (
              <FieldError id="signup-last-name-error">{fieldErrors.lastName}</FieldError>
            )}
          </Field>
        </div>

        <Field data-invalid={!!fieldErrors.email || undefined}>
          <FieldLabel htmlFor="signup-email">{t("email")}</FieldLabel>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "signup-email-error" : undefined}
            disabled={busy}
          />
          {fieldErrors.email && (
            <FieldError id="signup-email-error">{fieldErrors.email}</FieldError>
          )}
        </Field>

        <Field data-invalid={!!fieldErrors.password || undefined}>
          <FieldLabel htmlFor="signup-password">{t("password")}</FieldLabel>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder={t("passwordPlaceholder")}
            value={values.password}
            onChange={(e) => set("password", e.target.value)}
            aria-invalid={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? "signup-password-error" : undefined}
            disabled={busy}
          />
          {fieldErrors.password ? (
            <FieldError id="signup-password-error">{fieldErrors.password}</FieldError>
          ) : (
            <FieldDescription>{t("passwordHint")}</FieldDescription>
          )}
        </Field>

        <Field data-invalid={!!fieldErrors.confirmPassword || undefined}>
          <FieldLabel htmlFor="signup-confirm-password">{t("confirmPassword")}</FieldLabel>
          <Input
            id="signup-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder={t("confirmPasswordPlaceholder")}
            value={values.confirmPassword}
            onChange={(e) => set("confirmPassword", e.target.value)}
            aria-invalid={!!fieldErrors.confirmPassword}
            aria-describedby={fieldErrors.confirmPassword ? "signup-confirm-password-error" : undefined}
            disabled={busy}
          />
          {fieldErrors.confirmPassword && (
            <FieldError id="signup-confirm-password-error">{fieldErrors.confirmPassword}</FieldError>
          )}
        </Field>

        <Field>
          <Button
            type="submit"
            className="w-full"
            disabled={busy}
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
            onClick={handleGoogleSignUp}
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
            {t("haveAccount")}{" "}
            <Link href="/sign-in" className="underline underline-offset-4">
              {t("signIn")}
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}

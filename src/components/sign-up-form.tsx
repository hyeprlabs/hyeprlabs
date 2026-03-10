"use client"

import { useState, type FormEvent } from "react"
import { useSignUp } from "@clerk/nextjs/legacy"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { Loader2, Mail } from "lucide-react"
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

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { signUp, setActive, isLoaded } = useSignUp()
  const t = useTranslations("SignUp")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"register" | "verify">("register")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLoaded) return

    setIsSubmitting(true)

    try {
      await signUp.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        emailAddress: email.trim(),
        password,
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

  async function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLoaded) return

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
              {t("verifyDescription", { email })}
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="verify-code">{t("verifyCode")}</FieldLabel>
            <Input
              id="verify-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder={t("verifyCodePlaceholder")}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              required
              disabled={isSubmitting}
              className="text-center font-mono tracking-[0.4em]"
            />
          </Field>
          <Field>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || !isLoaded || code.length < 6}
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
          <Field>
            <FieldLabel htmlFor="signup-first-name">{t("firstName")}</FieldLabel>
            <Input
              id="signup-first-name"
              type="text"
              autoComplete="given-name"
              placeholder={t("firstNamePlaceholder")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isSubmitting || isGoogleLoading}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="signup-last-name">{t("lastName")}</FieldLabel>
            <Input
              id="signup-last-name"
              type="text"
              autoComplete="family-name"
              placeholder={t("lastNamePlaceholder")}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isSubmitting || isGoogleLoading}
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="signup-email">{t("email")}</FieldLabel>
          <Input
            id="signup-email"
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
          <FieldLabel htmlFor="signup-password">{t("password")}</FieldLabel>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
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
            onClick={handleGoogleSignUp}
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

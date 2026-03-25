"use client";

import { useState } from "react";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";

import { Eye, EyeOff, Github, LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import { Separator } from "@/components/ui/separator";

import { toast } from "sonner";

import { Link } from "@/i18n/navigation";

import { HyeprLabsWordmark } from "@/components/brand/logos";

import { useLocale, useTranslations } from "next-intl";

const schema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters.")
    .max(32, "Name must be at most 32 characters."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(64, "Password must be at most 64 characters."),
});

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("SignUpForm");
  const locale = useLocale();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const { signUp } = useSignUp();
  const router = useRouter();

  const togglePasswordVisibility = () =>
    setIsPasswordVisible((prevState) => !prevState);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Sign Up with GitHub
  async function handleGitHub() {
    setIsGitHubLoading(true);
    const { error } = await signUp.sso({
      strategy: "oauth_github",
      redirectUrl: `/${locale}/app`,
      redirectCallbackUrl: `/${locale}/sso-callback`,
    });
    if (error) {
      setIsGitHubLoading(false);
      toast.error(error.message);
    }
  }

  // Finalize the sign-up once status is complete
  async function finalizeSignUp() {
    await signUp.finalize({
      navigate: ({ decorateUrl }) => {
        const url = decorateUrl(`/${locale}/app`);
        if (url.startsWith("http")) {
          window.location.href = url;
        } else {
          router.push(url);
        }
      },
    });
  }

  // Sign Up with email/password
  async function handleSignUp(data: z.infer<typeof schema>) {
    const { error } = await signUp.password({
      emailAddress: data.email,
      password: data.password,
      firstName: data.name,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    if (signUp.status === "complete") {
      await finalizeSignUp();
    } else if (
      signUp.status === "missing_requirements" &&
      signUp.unverifiedFields.includes("email_address")
    ) {
      // Email verification required — send the code and show the verification step.
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        toast.error(sendError.message);
        return;
      }
      setVerifying(true);
    }
  }

  // Verify the email code the user received
  async function handleVerifyCode() {
    setIsVerifying(true);
    const { error } = await signUp.verifications.verifyEmailCode({
      code: verificationCode,
    });
    setIsVerifying(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    if (signUp.status === "complete") {
      await finalizeSignUp();
    }
  }

  // Resend email verification code
  async function handleResend() {
    const { error } = await signUp.verifications.sendEmailCode();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success(t("codeSent"));
    }
  }

  // ----- Email verification step -----
  if (verifying) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link href="/">
              <HyeprLabsWordmark height={24} />
              <span className="sr-only">Hyepr Labs</span>
            </Link>
            <h1 className="text-xl font-bold">{t("verifyTitle")}</h1>
            <FieldDescription className="font-mono">
              {t("verifyDescription")}
            </FieldDescription>
          </div>
          <Field className="gap-1">
            <FieldLabel htmlFor="code">{t("codeLabel")}</FieldLabel>
            <Input
              id="code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder={t("codePlaceholder")}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </Field>
          <Field>
            <Button
              type="button"
              className="cursor-pointer"
              disabled={isVerifying || !verificationCode}
              onClick={handleVerifyCode}
            >
              {isVerifying && (
                <LoaderCircle
                  aria-hidden="true"
                  className="-ms-1 me-2 animate-spin"
                  size={16}
                />
              )}
              {t("verifyButton")}
            </Button>
          </Field>
          <Field>
            <p className="text-center text-sm font-mono text-muted-foreground">
              {t("noCode")}{" "}
              <button
                type="button"
                onClick={handleResend}
                className="underline underline-offset-4 hover:text-foreground"
              >
                {t("resendCode")}
              </button>
            </p>
          </Field>
        </FieldGroup>
      </div>
    );
  }

  // ----- Sign up step -----
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={form.handleSubmit(handleSignUp)}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link href="/">
              <HyeprLabsWordmark height={24} />
              <span className="sr-only">Hyepr Labs</span>
            </Link>
            <h1 className="text-xl font-bold">{t("title")}</h1>
            <FieldDescription className="font-mono">
              {t("hasAccount")}{" "}
              <Link href="/sign-in">{t("signInLink")}</Link>
            </FieldDescription>
          </div>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">{t("nameLabel")}</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder={t("namePlaceholder")}
                  autoComplete="name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">{t("emailLabel")}</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1" data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">{t("passwordLabel")}</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                    className="pe-9"
                  />
                  <button
                    aria-controls="password"
                    aria-label={
                      isPasswordVisible ? t("hidePassword") : t("showPassword")
                    }
                    aria-pressed={isPasswordVisible}
                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={togglePasswordVisibility}
                    type="button"
                  >
                    {isPasswordVisible ? (
                      <EyeOff aria-hidden="true" size={16} />
                    ) : (
                      <Eye aria-hidden="true" size={16} />
                    )}
                  </button>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <LoaderCircle
                  aria-hidden="true"
                  className="-ms-1 me-2 animate-spin"
                  size={16}
                />
              )}
              {t("submitButton")}
            </Button>
          </Field>
          <Field>
            <div className="flex items-center gap-3">
              <Separator className="flex-1" />
              <span className="text-sm font-mono text-muted-foreground">
                {t("or")}
              </span>
              <Separator className="flex-1" />
            </div>
          </Field>
          <Field>
            <Button
              variant="outline"
              className="w-full cursor-pointer"
              onClick={handleGitHub}
              disabled={isGitHubLoading}
            >
              {isGitHubLoading ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="-ms-1 me-2 animate-spin"
                  size={16}
                />
              ) : (
                <Github />
              )}
              {t("continueWithGitHub")}
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center font-mono">
        {t("legalPrefix")}{" "}
        <Link href="/legal/terms-of-service">{t("termsOfService")}</Link>{" "}
        {t("legalMiddle")}{" "}
        <Link href="/legal/privacy-policy">{t("privacyPolicy")}</Link>
        {t("legalSuffix") ? ` ${t("legalSuffix")}` : "."}
      </FieldDescription>
    </div>
  );
}

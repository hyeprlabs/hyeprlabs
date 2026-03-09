"use client";

import { useState, type FormEvent } from "react";
import { useSignUp } from "@clerk/nextjs/legacy";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Loader2, AlertCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function SignUpForm({ className }: { className?: string }) {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const t = useTranslations("SignUp");

  // Step 1 fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Step 2 fields (email verification)
  const [code, setCode] = useState("");

  const [step, setStep] = useState<"register" | "verify">("register");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsSubmitting(true);
    setError("");

    try {
      await signUp.create({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        emailAddress: email.trim(),
        password,
      });

      // Trigger email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep("verify");
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ longMessage?: string; message?: string }> };
      const msg =
        clerkError?.errors?.[0]?.longMessage ??
        clerkError?.errors?.[0]?.message ??
        t("error.generic");
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsSubmitting(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({ code });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/profile");
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ longMessage?: string; message?: string }> };
      const msg =
        clerkError?.errors?.[0]?.longMessage ??
        clerkError?.errors?.[0]?.message ??
        t("error.generic");
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (step === "verify") {
    return (
      <form
        onSubmit={handleVerify}
        className={cn("space-y-4", className)}
        noValidate
      >
        {/* Icon + heading */}
        <div className="flex flex-col items-center gap-2 pb-2 text-center">
          <div className="flex size-10 items-center justify-center rounded-full border border-border bg-muted/50">
            <Mail className="size-5 text-muted-foreground" aria-hidden="true" />
          </div>
          <p className="font-serif text-lg">{t("verifyTitle")}</p>
          <p className="font-mono text-xs text-muted-foreground">
            {t("verifyDescription", { email })}
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
            <span className="font-mono text-xs leading-relaxed text-destructive">{error}</span>
          </div>
        )}

        {/* Code input */}
        <div className="space-y-1.5">
          <label
            htmlFor="verify-code"
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            {t("verifyCode")}
          </label>
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
        </div>

        <Button
          type="submit"
          className="w-full bg-linear-to-br from-foreground to-muted-foreground"
          disabled={isSubmitting || !isLoaded || code.length < 6}
        >
          {isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
          {t("verifySubmit")}
        </Button>

        <button
          type="button"
          onClick={() => { setStep("register"); setError(""); setCode(""); }}
          className="w-full text-center font-mono text-xs text-muted-foreground underline-offset-4 hover:underline"
        >
          {t("backToRegister")}
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleRegister}
      className={cn("space-y-4", className)}
      noValidate
    >
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
          <span className="font-mono text-xs leading-relaxed text-destructive">{error}</span>
        </div>
      )}

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label
            htmlFor="sign-up-first-name"
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            {t("firstName")}
          </label>
          <Input
            id="sign-up-first-name"
            type="text"
            autoComplete="given-name"
            placeholder={t("firstNamePlaceholder")}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="sign-up-last-name"
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            {t("lastName")}
          </label>
          <Input
            id="sign-up-last-name"
            type="text"
            autoComplete="family-name"
            placeholder={t("lastNamePlaceholder")}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="sign-up-email"
          className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          {t("email")}
        </label>
        <Input
          id="sign-up-email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label
          htmlFor="sign-up-password"
          className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          {t("password")}
        </label>
        <Input
          id="sign-up-password"
          type="password"
          autoComplete="new-password"
          placeholder={t("passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-linear-to-br from-foreground to-muted-foreground"
        disabled={isSubmitting || !isLoaded}
      >
        {isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
        {t("submit")}
      </Button>

      {/* Footer link */}
      <p className="text-center font-mono text-xs text-muted-foreground">
        {t("haveAccount")}{" "}
        <Link
          href="/sign-in"
          className="text-foreground underline-offset-4 hover:underline"
        >
          {t("signIn")}
        </Link>
      </p>
    </form>
  );
}

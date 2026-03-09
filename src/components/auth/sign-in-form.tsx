"use client";

import { useState, type FormEvent } from "react";
import { useSignIn } from "@clerk/nextjs/legacy";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { GoogleLogo } from "@/components/auth/google-logo";

export function SignInForm({ className }: { className?: string }) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const t = useTranslations("SignIn");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsSubmitting(true);

    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ longMessage?: string; message?: string }> };
      const msg =
        clerkError?.errors?.[0]?.longMessage ??
        clerkError?.errors?.[0]?.message ??
        t("error.generic");
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    if (!isLoaded) return;
    setIsGoogleLoading(true);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/profile",
      });
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ longMessage?: string; message?: string }> };
      const msg =
        clerkError?.errors?.[0]?.longMessage ??
        clerkError?.errors?.[0]?.message ??
        t("error.generic");
      toast.error(msg);
      setIsGoogleLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      noValidate
    >
      {/* Heading */}
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="font-serif text-2xl">{t("title")}</h1>
        <p className="text-balance font-mono text-xs text-muted-foreground">
          {t("description")}
        </p>
      </div>

      {/* Email */}
      <div className="grid gap-2">
        <label
          htmlFor="sign-in-email"
          className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          {t("email")}
        </label>
        <Input
          id="sign-in-email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting || isGoogleLoading}
        />
      </div>

      {/* Password */}
      <div className="grid gap-2">
        <div className="flex items-center">
          <label
            htmlFor="sign-in-password"
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            {t("password")}
          </label>
          <Link
            href="/forgot-password"
            className="ml-auto font-mono text-xs text-muted-foreground underline-offset-4 hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>
        <Input
          id="sign-in-password"
          type="password"
          autoComplete="current-password"
          placeholder={t("passwordPlaceholder")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting || isGoogleLoading}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full bg-linear-to-br from-foreground to-muted-foreground"
        disabled={isSubmitting || isGoogleLoading || !isLoaded}
      >
        {isSubmitting && <Loader2 className="animate-spin" aria-hidden="true" />}
        {t("submit")}
      </Button>

      {/* OR separator */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 font-mono text-xs text-muted-foreground">
            {t("orContinueWith")}
          </span>
        </div>
      </div>

      {/* Google OAuth */}
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

      {/* Footer link */}
      <p className="text-center font-mono text-xs text-muted-foreground">
        {t("noAccount")}{" "}
        <Link
          href="/sign-up"
          className="text-foreground underline-offset-4 hover:underline"
        >
          {t("signUp")}
        </Link>
      </p>
    </form>
  );
}

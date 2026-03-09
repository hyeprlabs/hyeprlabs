"use client";

import { useState, type FormEvent } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function SignInForm({ className }: { className?: string }) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const t = useTranslations("SignIn");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isLoaded) return;

    setIsSubmitting(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      });

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

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4", className)}
      noValidate
    >
      {/* Error message */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span className="font-mono text-xs leading-relaxed">{error}</span>
        </div>
      )}

      {/* Email */}
      <div className="space-y-1.5">
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
          disabled={isSubmitting}
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label
          htmlFor="sign-in-password"
          className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
        >
          {t("password")}
        </label>
        <Input
          id="sign-in-password"
          type="password"
          autoComplete="current-password"
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

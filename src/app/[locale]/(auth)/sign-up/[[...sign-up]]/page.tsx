import type { Metadata } from "next";

import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign Up for your Hyepr Labs Account.",
}

export default function Page() {
  return <SignUpForm />;
}
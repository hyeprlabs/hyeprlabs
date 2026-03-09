import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Hyepr Labs account.",
};

export default function Page() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-20">
      <SignIn />
    </div>
  );
}

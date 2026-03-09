import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Hyepr Labs account.",
};

export default function Page() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center py-20">
      <SignUp />
    </div>
  );
}

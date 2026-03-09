"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";

export function UserDropdown() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const t = useTranslations("UserDropdown");

  if (!isLoaded || !user) return null;

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    user.primaryEmailAddress?.emailAddress ||
    "User";

  const initials = (() => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  })();

  const primaryEmail = user.primaryEmailAddress?.emailAddress ?? "";

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={t("openMenu")}
          className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Avatar className="size-7 cursor-pointer">
            <AvatarImage src={user.imageUrl} alt={fullName} />
            <AvatarFallback className="border bg-transparent font-mono text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* User info header */}
        <DropdownMenuLabel className="flex flex-col gap-0.5 py-2">
          <span className="text-sm font-medium text-foreground">{fullName}</span>
          {primaryEmail && (
            <span className="truncate font-mono text-xs font-normal text-muted-foreground">
              {primaryEmail}
            </span>
          )}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex cursor-pointer items-center gap-2">
            <User className="size-4" />
            {t("viewProfile")}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={handleSignOut}
          className="cursor-pointer gap-2"
        >
          <LogOut className="size-4" />
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

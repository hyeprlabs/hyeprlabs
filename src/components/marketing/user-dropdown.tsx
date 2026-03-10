"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useTranslations } from "next-intl";
import { LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/navigation";

export function UserDropdown() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
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

  function handleSignOut() {
    void signOut({ redirectUrl: "/" });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={t("openMenu")}
          className="rounded-full outline-none ring-offset-2 ring-offset-background transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="size-7 cursor-pointer">
            <AvatarImage src={user.imageUrl} alt={fullName} />
            <AvatarFallback className="border bg-transparent font-mono text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 p-0">
        {/* User info header */}
        <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-3 py-3">
          <Avatar className="size-9 shrink-0">
            <AvatarImage src={user.imageUrl} alt={fullName} />
            <AvatarFallback className="border bg-background font-mono text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {fullName}
            </p>
            {primaryEmail && (
              <p className="truncate font-mono text-xs text-muted-foreground">
                {primaryEmail}
              </p>
            )}
          </div>
        </div>

        <div className="p-1">
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="flex cursor-pointer items-center gap-2"
            >
              <Settings className="size-4 text-muted-foreground" />
              {t("accountSettings")}
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="my-0" />

        <div className="p-1">
          <DropdownMenuItem
            variant="destructive"
            onClick={handleSignOut}
            className="cursor-pointer gap-2"
          >
            <LogOut className="size-4" />
            {t("signOut")}
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


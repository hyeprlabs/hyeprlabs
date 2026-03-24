"use client"

import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { Link } from "@/i18n/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useClerk, useUser } from "@clerk/nextjs"
import { LayoutDashboard, LogOutIcon, UserIcon } from 'lucide-react'

export function UserDropdown() {
  const { signOut } = useClerk()
  const { isLoaded, user } = useUser()

  const name = user?.fullName || user?.username || ""
  const email = user?.primaryEmailAddress?.emailAddress || ""
  const src = user?.imageUrl || ""

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="relative w-fit">
            <Avatar size="sm" className="ring-offset-background animate-pulse ring-2 ring-green-500 ring-offset-2">
              <AvatarImage src={src} alt={name}/>
            </Avatar>
            <span className="border-background absolute -right-1 -bottom-1 size-3 rounded-full border-2 bg-green-500" />
        </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" sideOffset={8}>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex items-center gap-2 py-2">
              <Avatar className="size-8">
                <AvatarImage
                  src={src}
                  alt={name}
                />
              </Avatar>
              <div className="flex flex-col">
                <span className="text-foreground text-sm font-medium">
                  {isLoaded ? name : ""}
                </span>
                <span className="text-muted-foreground text-xs font-normal">
                  {isLoaded ? email : ""}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/overview">
                  <LayoutDashboard aria-hidden="true" />
                  Overview
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <UserIcon aria-hidden="true" />
                  Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={() => signOut({ redirectUrl: '/' })}>
              <LogOutIcon aria-hidden="true" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

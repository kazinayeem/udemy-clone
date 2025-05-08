"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/features/authSlice";
import { deleteCookie } from "@/app/auth/action";

export default function Navbar() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = async () => {
    dispatch(logout());
    await deleteCookie("token");
    router.replace("/");
  };
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <nav className="bg-cyan-100/70 w-full border-b border-black">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center container">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-eRVar-dC.svg"
            alt="Logo"
            width={130}
            height={50}
            className="dark:invert"
            priority
          />
        </Link>

        {/* Right side: Auth actions */}
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/profile"}>Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/dashboard/course"}>Dashboard</Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={logoutHandler}>
                LogOut
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Create Account
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

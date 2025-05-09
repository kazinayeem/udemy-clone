"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  BookIcon,
  UserIcon,
  PhoneIcon,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/authSlice";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/app/auth/action";
import Image from "next/image";

export function AppSidebar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutHandler = async () => {
    dispatch(logout());
    await deleteCookie("token");
    router.replace("/");
  };

  return (
    <SidebarProvider className="">
      <Sidebar className="hidden lg:flex w-64 h-screen shadow-md border-r">
        <SidebarHeader className="px-6 py-4 text-lg font-bold">
          <Image
            src="/logo-eRVar-dC.svg"
            alt="Logo"
            width={130}
            height={50}
            className="dark:invert"
            priority
          />
        </SidebarHeader>

        <SidebarContent className="flex-1 px-4">
          <SidebarGroup>
            <NavItem
              href="/"
              icon={<HomeIcon className="w-4 h-4" />}
              label="Home"
            />
            <NavItem
              href="/dashboard/course"
              icon={<BookIcon className="w-4 h-4" />}
              label="My Course"
            />
            <NavItem
              href="/profile"
              icon={<UserIcon className="w-4 h-4" />}
              label="Profile"
            />
            <NavItem
              href="/contact"
              icon={<PhoneIcon className="w-4 h-4" />}
              label="Contact"
            />
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <Button
            onClick={logoutHandler}
            variant="destructive"
            className="w-full flex items-center justify-center"
          >
            <LogOutIcon className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarTrigger />
    </SidebarProvider>
  );
}

// Reusable nav item component
function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      {icon}
      {label}
    </Link>
  );
}

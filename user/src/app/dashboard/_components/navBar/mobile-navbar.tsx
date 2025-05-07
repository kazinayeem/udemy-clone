"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogOutIcon, Menu } from "lucide-react";
import { NavbarItem } from "./sidebar-item";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/features/authSlice";

export const MobileNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutHandeler = () => {
    dispatch(logout());
    router.replace("/");
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Navigate through the website</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <NavbarItem href="/">Home</NavbarItem>
          <NavbarItem href="/about">About</NavbarItem>
          <NavbarItem href="/services">Services</NavbarItem>
          <NavbarItem href="/contact">Contact</NavbarItem>
          <Button onClick={logoutHandeler}>
            <LogOutIcon />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

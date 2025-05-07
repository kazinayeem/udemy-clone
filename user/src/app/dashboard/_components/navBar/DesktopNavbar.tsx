"use client";
import { Button } from "@/components/ui/button";
import { NavbarItem } from "./sidebar-item";
import { LogOutIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/lib/features/authSlice";
import { useRouter } from "next/navigation";

export const DesktopNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const logoutHandeler = () => {
    dispatch(logout());
    router.replace("/");
  };
  return (
    <div className="hidden lg:flex flex-col w-64 bg-white text-black p-4 max-h-full  border-black h-screen shadow-lg rounder-sm">
      <NavbarItem href="/">Home</NavbarItem>
      <NavbarItem href="/about">About</NavbarItem>
      <NavbarItem href="/services">Services</NavbarItem>
      <NavbarItem href="/contact">Contact</NavbarItem>
      <Button onClick={logoutHandeler}>
        <LogOutIcon />
      </Button>
    </div>
  );
};

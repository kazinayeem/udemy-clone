import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavbarItem } from "./sidebar-item";

export const MobileNavbar = () => {
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
        </div>
      </SheetContent>
    </Sheet>
  );
};

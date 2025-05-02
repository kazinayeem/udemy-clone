import { NavbarItem } from "./sidebar-item";

export const DesktopNavbar = () => {
  return (
    <div className="hidden lg:flex flex-col w-64 bg-white text-black p-4 max-h-full  border-black h-screen shadow-lg rounder-sm">
      <NavbarItem href="/">Home</NavbarItem>
      <NavbarItem href="/about">About</NavbarItem>
      <NavbarItem href="/services">Services</NavbarItem>
      <NavbarItem href="/contact">Contact</NavbarItem>
    </div>
  );
};

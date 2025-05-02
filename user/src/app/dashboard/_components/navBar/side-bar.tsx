import { NavbarItem } from "./sidebar-item";

export default function Sidebar() {
  return (
    <div className="flex flex-col p-4 gap-2 space-y-4">
      <NavbarItem href="/">Home</NavbarItem>
      <NavbarItem href="/profile">Profile</NavbarItem>
      <NavbarItem href="/settings">Settings</NavbarItem>
      <NavbarItem href="/logout">Logout</NavbarItem>
    </div>
  );
}

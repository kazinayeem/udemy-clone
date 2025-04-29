import React from "react";
import { NavLink } from "react-router";
import { cn } from "~/lib/utils";

interface SidebarItemProps {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  link?: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon,
  active,
  link,
}) => {
  return (
    <NavLink
      to={`${link}`}
      className={cn(
        "flex items-center w-full p-3 rounded-lg transition-colors",
        active ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-700"
      )}
    >
      {icon && <span className="mr-3">{icon}</span>}
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
};

export default SidebarItem;

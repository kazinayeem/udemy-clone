import React from "react";
import { useLocation } from "react-router";
import SidebarItem from "./sidebar-item";
import { adminRoutes, teacherRoutes } from "./sidebar-routes";

const Sidebar: React.FC = () => {
  const location = useLocation();

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error("Invalid user data in localStorage");
  }

  const role = user?.role;
  const isAdmin = role === "ADMIN";
  const isTeacher = role === "TEACHER";

  const routes = isAdmin ? adminRoutes : isTeacher ? teacherRoutes : [];

  return (
    <aside className="h-screen w-64 bg-white border-r p-5 flex flex-col">
      <div className="text-2xl font-bold mb-8">Udemy</div>
      <nav className="flex flex-col gap-2">
        {routes.map((item) => (
          <SidebarItem
            key={item.link}
            label={item.label}
            icon={item.icon}
            link={item.link}
            active={location.pathname === item.link}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

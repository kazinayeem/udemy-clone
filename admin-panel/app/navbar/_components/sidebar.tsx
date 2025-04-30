import React from "react";
import { useLocation } from "react-router";
import SidebarItem from "./sidebar-item";
import { adminRoutes, teacherRoutes } from "./sidebar-routes";
import { Button } from "~/components/ui/button";
import { useAppDispatch } from "~/redux/store/store";
import { useNavigate } from "react-router";
import { logout } from "~/redux/reducer/authSlice";
import { LogOutIcon } from "lucide-react";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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
        {/* log out */}
        <Button
          variant="default"
          className="mt-auto"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            dispatch(logout());
            navigate("/login");
          }}
        >
          <LogOutIcon /> Log Out
        </Button>
      </nav>
    </aside>
  );
};

export default Sidebar;

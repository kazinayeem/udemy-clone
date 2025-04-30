// sidebar-routes.tsx
import { Home, Settings, User } from "lucide-react";

export const adminRoutes = [
  {
    label: "Dashboard Home",
    icon: <Home size={18} />,
    link: "/dashboard/home",
  },
  {
    label: "User Management",
    icon: <User size={18} />,
    link: "/dashboard/users",
  },
  {
    label: "Course Management",
    icon: <User size={18} />,
    link: "/dashboard/courses",
  },
  {
    label: "Category Management",
    icon: <User size={18} />,
    link: "/dashboard/categories",
  },
  {
    label: "Instructor Management",
    icon: <User size={18} />,
    link: "/dashboard/instructors",
  },
  {
    label: "Student Management",
    icon: <User size={18} />,
    link: "/dashboard/students",
  },
  {
    label: "Settings",
    icon: <Settings size={18} />,
    link: "/settings",
  },
];

export const teacherRoutes = [
  {
    label: "Teacher Dashboard",
    icon: <Home size={18} />,
    link: "/teacher/",
  },
  {
    label: "Add Course",
    icon: <User size={18} />,
    link: "/teacher/course",
  },
  {
    label: "Settings",
    icon: <Settings size={18} />,
    link: "/teacher/settings",
  },
];

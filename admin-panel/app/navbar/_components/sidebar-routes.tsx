// sidebar-routes.tsx
import { Home, Settings, Tag, User } from "lucide-react";

export const adminRoutes = [
  {
    label: "Dashboard Home",
    icon: <Home size={18} />,
    link: "/dashboard",
  },
  {
    label: "Student Management",
    icon: <User size={18} />,
    link: "/dashboard/students",
  },
  {
    label: "Teacher Management",
    icon: <User size={18} />,
    link: "/dashboard/teachers",
  },
  {
    label: "Category Management",
    icon: <Tag size={18} />,
    link: "/dashboard/categories",
  },
  {
    label: "Course Management",
    icon: <User size={18} />,
    link: "/dashboard/course-management",
  },
  {
    label: "Review Management",
    icon: <User size={18} />,
    link: "/dashboard/review-management",
  },
  {
    label: "Settings",
    icon: <Settings size={18} />,
    link: "/dashboard/settings",
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
    label: "Show Course",
    icon: <User size={18} />,
    link: "/teacher/course/show-courses",
  },
  {
    label: "My Students",
    icon: <Settings size={18} />,
    link: "/teacher/students",
  },
  {
    label: "Profile",
    icon: <User size={18} />,
    link: "/teacher/profile",
  },
];

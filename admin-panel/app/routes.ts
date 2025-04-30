import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("dashboard", [
    layout("routes/dashboard/layout.tsx", [
      index("routes/dashboard/index.tsx"),
      route("home", "routes/dashboard/home.tsx"),
      route("test", "routes/dashboard/test.tsx"),
      route("*", "routes/dashboard/not-found.tsx"),
    ]),
  ]),
  ...prefix("teacher", [
    layout("routes/teacher/layout.tsx", [
      index("routes/teacher/index.tsx"),
      route("add-course", "routes/teacher/add-course.tsx"),
      route("*", "routes/teacher/not-found.tsx"),
    ]),
  ]),
  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;

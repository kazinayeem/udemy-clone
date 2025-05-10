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
      route("categories", "routes/dashboard/category/index.tsx"),
      route("students", "routes/dashboard/student/index.tsx"),
      route("teachers", "routes/dashboard/teacher/index.tsx"),
      route("course-management", "routes/dashboard/course/index.tsx"),
      route(
        "course-management/details/:courseId",
        "routes/dashboard/course/courseDetails/index.tsx"
      ),
      route("review-management", "routes/dashboard/review/index.tsx"),
      route("*", "routes/dashboard/not-found.tsx"),
    ]),
  ]),
  ...prefix("teacher", [
    layout("routes/teacher/layout.tsx", [
      index("routes/teacher/index.tsx"),
      route("profile", "routes/teacher/profile/profile.tsx"),
      route("students", "routes/teacher/students/index.tsx"),
      route("course", "routes/teacher/course.tsx"),
      route(
        "/course/add-course",
        "routes/teacher/course/add-course/add-course.tsx"
      ),
      route(
        "/course/course-details/:courseId",
        "routes/teacher/course/course-details/course-details.tsx"
      ),
      route(
        "/course/show-courses",
        "routes/teacher/course/show-course/all-course.tsx"
      ),
      route(
        "/course/course-details/:courseId/lessons/:lessonId",
        "routes/teacher/course/lessons/lessons.tsx"
      ),
      route(
        "/course/course-details/:courseId/fqa",
        "routes/teacher/course/fqa/index.tsx"
      ),
      route("*", "routes/teacher/not-found.tsx"),
    ]),
  ]),
  layout("routes/auth/layout.tsx", [
    route("login", "routes/auth/login.tsx"),
    route("register", "routes/auth/register.tsx"),
  ]),
] satisfies RouteConfig;

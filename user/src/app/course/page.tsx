// app/course/page.tsx
import React, { Suspense } from "react";
import CoursePage from "./_components/CoursePageWrapper";

export default function CoursePageWrapper() {
  return (
    <Suspense
      fallback={<div className="text-center py-20">Loading Courses...</div>}
    >
      <CoursePage />
    </Suspense>
  );
}

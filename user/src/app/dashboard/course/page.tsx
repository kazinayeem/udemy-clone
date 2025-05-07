/* app/course/page.tsx */
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/app/auth/action";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";

type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: number;
  level: string;
  language: string;
};

type Enrollment = {
  id: string;
  course: Course;
};

export default function Page() {
  const [courses, setCourses] = useState<Enrollment[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMyCourses = async () => {
      try {
        const token = await getCookie("token");
        const res = await axios.get(
          "http://localhost:8080/api/enrollment/mycourse",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    getMyCourses();
  }, []);

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">📚 My Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-xl" />
            ))
          : courses?.map((enroll) => (
              <Card key={enroll.id} className="overflow-hidden shadow-md">
                <Link href={`/dashboard/course/${enroll.course.id}`}>
                  <div className="relative w-full h-40">
                    <Image
                      src={enroll.course.image}
                      alt={enroll.course.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h2 className="text-lg font-bold mb-2 line-clamp-2">
                      {enroll.course.title}
                    </h2>
                    <div
                      className="text-sm text-muted-foreground mb-2 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: enroll.course.description,
                      }}
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">
                        ⏳ {enroll.course.duration}h
                      </Badge>
                      <Badge variant="outline">🎓 {enroll.course.level}</Badge>
                      <Badge variant="default">
                        🌐 {enroll.course.language}
                      </Badge>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
      </div>
    </div>
  );
}

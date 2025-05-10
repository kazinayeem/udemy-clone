"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import CourseFAQAccordion from "./_components/CourseFAQ";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { getCookie } from "@/app/auth/action";
import Loading from "./loading";
import CourseTimeline from "./_components/CourseTimeline";
import CourseDescription from "./_components/CourseDescriptio";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseResponse {
  data: {
    id: string;
    image: string;
    title: string;
    price: number;
    duration: number;
    description: string;
    fqa: FAQ[];
    instructor: {
      name: string;
    };
    chapters: {
      id: string;
      title: string;
      lessons: {
        id: string;
        title: string;
        isFree: boolean;
        video?: string;
      }[];
    }[];
  };
}

export default function CoursePage() {
  const { courseid } = useParams() as { courseid: string };
  const router = useRouter();

  const [courseData, setCourseData] = useState<CourseResponse["data"] | null>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getCookie("token");
      setIsLoggedIn(!!token);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/client/course/${courseid}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          router.replace("/not-found");
          return;
        }

        const json = await res.json();
        setCourseData(json.data);

        if (token) {
          const check = await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER}/enrollment/check/${courseid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setEnrolled(check.data.enrolled);
        }
      } catch (error) {
        console.error("Error loading course", error);
      }
    };

    fetchData();
  }, [courseid, router]);

  if (!courseData) return <Loading />;

  const totalLessons = courseData.chapters.reduce(
    (sum, ch) => sum + ch.lessons.length,
    0
  );

  return (
    <div className="bg-gradient-to-b from-cyan-100/70 min-h-screen m-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Right section: Course details card */}
          <div className="order-1 md:order-2 bg-white rounded-lg shadow-lg p-6 h-[480px]">
            <Image
              src={courseData.image}
              alt={courseData.title}
              width={400}
              height={200}
              className="rounded-md mb-6 w-full object-cover"
            />
            <p className="text-red-600 text-sm font-medium mb-2">
              ⏰ 5 days left at this price!
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold">
                ${courseData.price.toFixed(2)}
              </span>
              <span className="line-through text-gray-400">$69.99</span>
              <span className="text-green-600 text-sm font-semibold">
                20% off
              </span>
            </div>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-4">
              <span>⭐ 3</span>
              <span>⏱️ {courseData.duration} hours</span>
              <span>📚 {totalLessons} lessons</span>
            </div>

            {!isLoggedIn ? (
              <Link href="/auth">
                <Button className="w-full mb-6">Login to Enroll</Button>
              </Link>
            ) : !enrolled ? (
              <Link href={`/checkout/${courseData.id}`}>
                <Button className="w-full mb-6">Enroll Now</Button>
              </Link>
            ) : (
              <Link href={`/dashboard/course/${courseData.id}`}>
                <Button className="w-full mb-6">Go To course Dashboard</Button>
              </Link>
            )}
          </div>

          {/* Left section: Course content */}
          <div className="order-2 md:order-1 md:col-span-2">
            <h1 className="p-2 text-2xl font-extrabold mb-4">
              {courseData.title}
            </h1>
            <CourseDescription description={courseData.description} />

            <div className="p-6 flex flex-wrap items-center gap-3 text-sm mb-4 text-muted-foreground">
              <span>⭐ 3</span>
              <span>(5 ratings)</span>
              <span>· 11 students</span>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Course by{" "}
              <span className="text-blue-600 font-semibold">
                {courseData.instructor.name}
              </span>
            </p>
            <CourseTimeline chapters={courseData.chapters} />
          </div>
        </div>
      </div>
      <CourseFAQAccordion fqa={courseData.fqa} />
    </div>
  );
}

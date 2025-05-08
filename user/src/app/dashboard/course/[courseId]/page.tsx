"use client";

import { getCookie } from "@/app/auth/action";
import ReviewSection from "@/components/ReviewSection";
import { Alert } from "@/components/ui/alert";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";

type Lesson = {
  id: string;
  title: string;
  video: string;
  isFree: boolean;
  isPublished: boolean;
  description: string;
};

type Chapter = {
  id: string;
  title: string;
  lessons: Lesson[];
};

type Course = {
  id: string;
  title: string;
  description: string;
  image: string;
  Chapter: Chapter[];
};

export default function CoursePage() {
  const { courseId } = useParams() as { courseId: string };
  const [course, setCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = await getCookie("token");
        const res = await axios.get<Course>(
          `http://localhost:8080/api/enrollment/mycourse/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.data.Chapter || res.data.Chapter.length === 0) {
          setError("No chapters available for this course.");
        } else if (
          !res.data.Chapter[0].lessons ||
          res.data.Chapter[0].lessons.length === 0
        ) {
          setError("No lessons available in the first chapter.");
        } else {
          setCourse(res.data);
          setActiveLesson(res.data.Chapter[0]?.lessons[0] || null);
        }
      } catch (err) {
        console.error("Error loading course:", err);
        setError("An error occurred while loading the course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert>{error}</Alert>
      </div>
    );
  }

  if (!course || !activeLesson) {
    return <div className="p-6">No course or lesson found.</div>;
  }

  return (
    <>
      {" "}
      <ReviewSection courseId={courseId} />{" "}
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] min-h-screen gap-4">
        <aside className="bg-gray-100 border-r p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Course Content</h2>
          {course?.Chapter?.map((chapter) => (
            <div key={chapter.id} className="mb-4">
              <h3 className="text-md font-semibold mb-2">{chapter.title}</h3>
              <ul className="space-y-1">
                {chapter?.lessons?.map((lesson) => (
                  <li
                    key={lesson.id}
                    className={`cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-all duration-300 ease-in-out ${
                      activeLesson.id === lesson.id ? "bg-gray-300" : ""
                    }`}
                    onClick={() => setActiveLesson(lesson)}
                  >
                    ▶ {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        {/* Main Video Area */}
        <main className="p-6 space-y-6">
          <div className="aspect-video rounded-xl overflow-hidden shadow-md">
            <ReactPlayer
              url={activeLesson.video}
              controls
              width="100%"
              height="100%"
              className="rounded-xl"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{activeLesson.title}</h1>
          </div>

          {/* Dynamic Lesson Description */}
          <div className="lesson-description mt-4 p-4 bg-gray-50 rounded-md shadow-md">
            <div
              className="prose max-w-4xl text-sm tracking-wide"
              dangerouslySetInnerHTML={{ __html: activeLesson.description }}
            />
          </div>
        </main>
      </div>
    </>
  );
}

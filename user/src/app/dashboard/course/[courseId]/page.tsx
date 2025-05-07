"use client";

import { getCookie } from "@/app/auth/action";
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
        setCourse(res.data);
        // Set the first lesson as default
        const firstLesson = res.data.Chapter[0]?.lessons[0] || null;
        setActiveLesson(firstLesson);
      } catch (err) {
        console.error("Error loading course:", err);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course || !activeLesson) return <div className="p-6">Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] min-h-screen">
      {/* Sidebar */}
      <aside className="bg-gray-100 border-r p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
        {course.Chapter.map((chapter) => (
          <div key={chapter.id} className="mb-4">
            <h3 className="text-md font-semibold mb-2">{chapter.title}</h3>
            <ul className="space-y-1">
              {chapter.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className={`cursor-pointer p-2 rounded-md hover:bg-gray-200 ${
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
        <div
          className="prose max-w-4xl"
          dangerouslySetInnerHTML={{ __html: course.description }}
        />
      </main>
    </div>
  );
}

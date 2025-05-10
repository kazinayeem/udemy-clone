"use client";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import 'react-vertical-timeline-component/style.min.css';
import { BookOpen, Video } from "lucide-react";
import { Suspense } from "react";
import FreePreviewButton from "../_components/FreePreviewButton";

interface Props {
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
}

export default function CourseTimeline({ chapters }: Props) {
  return (
    <div className="px-4 sm:px-6 mb-8 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 p-6 text-center">Course Structure</h2>
      <VerticalTimeline lineColor="#e5e7eb" className="mx-auto">
        {chapters.map((chapter, chapterIndex) => (
          <VerticalTimelineElement
            key={chapter.id}
            className="vertical-timeline-element--work"
            contentStyle={{
              background: "#f0f9ff",
              color: "#0f172a",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            contentArrowStyle={{
              borderRight: "7px solid #f0f9ff",
            }}
            iconStyle={{
              background: "#06b6d4",
              color: "#fff",
              borderRadius: "50%",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
            icon={<BookOpen size={18} />}
          >
            <h3 className="vertical-timeline-element-title font-bold text-lg text-center">
              {chapter.title}
            </h3>
            {chapter.lessons.length === 0 ? (
              <p className="text-sm text-gray-500 mt-2 text-center">No lessons available.</p>
            ) : (
              chapter.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="mt-3 p-4 rounded-md border bg-white shadow-sm text-sm mb-4 hover:shadow-md transition duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 flex items-center gap-2">
                      <Video size={16} /> {lesson.title}
                    </span>
                    {!lesson.isFree && (
                      <span className="text-xs text-red-500 font-semibold">
                        Locked 🔒
                      </span>
                    )}
                  </div>
                  {lesson.isFree && lesson.video?.includes("youtube.com") && (
                    <div className="mt-2">
                      <Suspense fallback={<p>Loading preview...</p>}>
                        <FreePreviewButton videoUrl={lesson.video} />
                      </Suspense>
                    </div>
                  )}
                </div>
              ))
            )}
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";
import FreePreviewButton from "./_components/FreePreviewButton";
import { Suspense } from "react";
import { Lock } from "lucide-react";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseid: string }>;
}) {
  const res = await fetch(
    `http://localhost:8080/api/client/course/${(await params).courseid}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return notFound();

  interface CourseResponse {
    data: {
      image: string;
      title: string;
      price: number;
      duration: number;
      description: string;
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

  const { data }: CourseResponse = await res.json();

  return (
    <div className="bg-gradient-to-b from-cyan-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 ">
        {/* Responsive Order: Price card first on small screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-6">
          {/* Right Column - Pricing & Info (shown first on small) */}
          <div className="order-1 md:order-2 bg-white rounded-lg shadow p-6 border">
            <Image
              src={data.image}
              alt={data.title}
              width={400}
              height={200}
              className="rounded-md mb-4 w-full object-cover"
            />
            <p className="text-red-600 text-sm font-medium mb-1">
              ⏰ 5 days left at this price!
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold">
                ${data.price.toFixed(2)}
              </span>
              <span className="line-through text-gray-400">$69.99</span>
              <span className="text-green-600 text-sm font-semibold">
                20% off
              </span>
            </div>
            <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4 mb-4">
              <span>⭐ 3</span>
              <span>⏱️ {data.duration} hours</span>
              <span>
                📚{" "}
                {data.chapters.reduce((sum, ch) => sum + ch.lessons.length, 0)}{" "}
                lessons
              </span>
            </div>
            <Button className="w-full mb-4">Enroll Now</Button>

            <h3 className="font-semibold text-base mb-2">
              What&apos;s in the course?
            </h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Lifetime access with free updates</li>
              <li>Step-by-step, hands-on project guidance</li>
              <li>Real-world examples and tools</li>
            </ul>
          </div>

          {/* Left Column - Course Details & Chapters */}
          <div className="order-2 md:order-1 md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-muted-foreground text-sm mb-4">
              {data.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 text-sm mb-2 text-muted-foreground">
              <span>⭐ 3</span>
              <span>(5 ratings)</span>
              <span>· {11} students</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
              Course by{" "}
              <span className="text-blue-600 font-medium">
                {data.instructor.name}
              </span>
            </p>

            <h2 className="text-xl font-semibold mb-4">Course Structure</h2>
            <Accordion type="multiple" className="w-full">
              {data.chapters.map((chapter) => (
                <AccordionItem value={chapter.id} key={chapter.id}>
                  <AccordionTrigger>
                    <div className="flex justify-between items-center w-full">
                      <span>{chapter.title}</span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        📚 {chapter.lessons.length}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    {chapter.lessons.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No lessons available.
                      </p>
                    ) : (
                      chapter.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="border rounded-lg p-4 my-3 bg-white shadow-sm hover:bg-gray-100 transition duration-300"
                        >
                          <h4 className="text-lg font-semibold text-gray-800">
                            {lesson.title}
                          </h4>
                          {lesson.isFree === false && (
                            <div className="flex items-center mt-2 text-gray-500">
                              <Lock className="mr-2 text-red-500" />
                              <span className="text-sm">
                                This lesson is locked
                              </span>
                            </div>
                          )}

                          {lesson.isFree &&
                            lesson.video?.includes("youtube.com") && (
                              <div className="mt-3">
                                <Suspense fallback={<h1>laoding</h1>}>
                                  <FreePreviewButton videoUrl={lesson.video} />
                                </Suspense>
                              </div>
                            )}
                        </div>
                      ))
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

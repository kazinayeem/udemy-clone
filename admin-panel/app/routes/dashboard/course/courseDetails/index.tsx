import React, { useState } from "react";
import { Link, useParams } from "react-router";
import { useGetCourseByIdQuery } from "~/redux/api/courseApi";

import { Terminal } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  image: string | null;
  isActive: boolean;
  role: string;
  description: string | null;
  phone: string | null;
  bio: string | null;
  address: string | null;
  country: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  isFree: boolean;
  isPublished: boolean;
  video: string | null;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  chapterId: string;
}

interface Chapter {
  id: string;
  title: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: number;
  isPublished: boolean;
  categoryId: string;
  courseItemId: string | null;
  level: string;
  language: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  chapterid: string | null;
  approval: boolean;
  category: Category;
  user: User;
  lessons: Lesson[];
  Chapter: Chapter[];
}

// Helper function to extract YouTube video ID with proper typing
const getYouTubeId = (url: string): string | null => {
  if (!url) return null;

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Type for the error from RTK Query
interface RTKQueryError {
  status?: number;
  data?: unknown;
  error?: string;
  message?: string;
}

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: course, error, isLoading } = useGetCourseByIdQuery(courseId);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const openVideo = (url: string): void => {
    if (url) {
      setSelectedVideo(url);
    }
  };

  const closeVideo = (): void => {
    setSelectedVideo(null);
  };

  const parseHtml = (html: string): { __html: string } => {
    return { __html: html };
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 bg-white p-6">
        <div className="space-y-8">
          <Skeleton className="h-12 w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-64 w-full" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    const err = error as RTKQueryError;
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error loading course</AlertTitle>
          <AlertDescription>
            {err.message || "Failed to load course data. Please try again."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto py-8">
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>Course not found</AlertTitle>
          <AlertDescription>
            The course you're looking for doesn't exist or may have been
            removed.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 p-6 w-full">
      <Link
        viewTransition
        className="hover:underline"
        to={"/dashboard/course-management"}
      >
        Go To pre Page
      </Link>
      {/* Video Modal */}
      <AlertDialog open={!!selectedVideo} onOpenChange={closeVideo}>
        <AlertDialogContent className="max-w-4xl p-0">
          <AlertDialogHeader className="px-6 pt-6">
            <AlertDialogTitle>Video Lesson</AlertDialogTitle>
          </AlertDialogHeader>
          {selectedVideo && (
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeId(
                  selectedVideo
                )}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">
              {course.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{course.level}</Badge>
              <Badge variant="outline">{course.language}</Badge>
              <Badge variant="outline">{course.duration} hours</Badge>
              {course.isPublished ? (
                <Badge className="bg-green-500">Published</Badge>
              ) : (
                <Badge variant="secondary">Draft</Badge>
              )}
            </div>
          </div>

          {/* Course description */}
          <Accordion type="single" collapsible defaultValue="description">
            <AccordionItem value="description">
              <AccordionTrigger>
                <h2 className="text-xl font-semibold">Course Description</h2>
              </AccordionTrigger>
              <AccordionContent>
                {course.description ? (
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={parseHtml(course.description)}
                  />
                ) : (
                  <p className="text-muted-foreground">
                    No description provided for this course.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Chapters and lessons */}
          {course.Chapter?.length ? (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold">Curriculum</h2>
              {course.Chapter.map((chapter: Chapter) => (
                <Accordion
                  key={chapter.id}
                  type="single"
                  collapsible
                  defaultValue={chapter.id}
                >
                  <AccordionItem value={chapter.id}>
                    <AccordionTrigger>
                      <h3 className="text-lg font-medium">{chapter.title}</h3>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      {chapter.lessons?.length ? (
                        chapter.lessons.map((lesson: Lesson) => (
                          <div
                            key={lesson.id}
                            className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{lesson.title}</h3>
                                {lesson.description && (
                                  <Accordion type="single" collapsible>
                                    <AccordionItem value="description">
                                      <AccordionTrigger className="py-1 text-sm">
                                        Description
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <div
                                          className="prose prose-sm max-w-none mt-2 text-muted-foreground"
                                          dangerouslySetInnerHTML={parseHtml(
                                            lesson.description
                                          )}
                                        />
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {lesson.isFree && (
                                  <Badge variant="secondary">Free</Badge>
                                )}
                                {lesson.video ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                      openVideo(lesson.video as string)
                                    }
                                  >
                                    Watch
                                  </Button>
                                ) : (
                                  <Button variant="outline" size="sm" disabled>
                                    Coming Soon
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-muted-foreground">
                          No lessons available in this chapter yet.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No chapters available for this course yet.
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              {course.image ? (
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full p-2 h-48 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-48 bg-muted flex items-center justify-center rounded-t-lg">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span>{course.category?.name || "Uncategorized"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Language</span>
                    <span>{course.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{course.duration} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span>${course.price}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructor */}
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.user ? (
                <>
                  <div className="flex items-center gap-4">
                    {course.user.image ? (
                      <img
                        src={course.user.image}
                        alt={course.user.name}
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">
                          {course.user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{course.user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {course.user.role}
                      </p>
                    </div>
                  </div>
                  {course.user.bio && (
                    <Accordion type="single" collapsible>
                      <AccordionItem value="bio">
                        <AccordionTrigger className="py-2">
                          About Instructor
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-sm">{course.user.bio}</p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </>
              ) : (
                <p className="text-muted-foreground">
                  No instructor information available.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Course stats */}
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Chapters</span>
                <span>{course.Chapter?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lessons</span>
                <span>{course.lessons?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Created</span>
                <span>{new Date(course.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

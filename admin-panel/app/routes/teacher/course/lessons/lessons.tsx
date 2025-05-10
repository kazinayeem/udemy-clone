import { Link, useParams } from "react-router";
import { useGetLessonByCourseIdQuery } from "~/redux/api/courseApi";
import TitleForm from "./_components/title-form";
import DescriptionForm from "./_components/description-from";
import IsPublishedForm from "./_components/published-form";
import IsFreeForm from "./_components/isFree-form";
import VideoForm from "./_components/video.-form";
import ChapterForm from "./_components/chapter-form";

export default function Lessons() {
  const { courseId, lessonId } = useParams();

  // Fetching the lesson data
  const { data, isLoading, isError } = useGetLessonByCourseIdQuery({
    courseId: courseId as string,
    lessonId: lessonId as string,
  });

  // If loading or error, display respective messages
  if (isLoading)
    return (
      <div className="text-center text-gray-500">Loading lesson details...</div>
    );
  if (isError)
    return (
      <div className="text-center text-red-500">
        Error fetching lesson details
      </div>
    );

  const { title, description, isPublished, video, isFree, chapterId } =
    data || {};

  const requiredFields = [title, description, video, chapterId];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  return (
    <div className="w-full mx-auto px-4 py-8 bg-gray-100 h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Lesson Details</h1>
        <span className="text-lg text-gray-500">{completionText}</span>
      </div>

      {/* Go to Course Page */}
      <div className="mb-6">
        <Link
          viewTransition
          to={`/teacher/course/course-details/${courseId}`}
          className="inline-block text-blue-600 hover:text-blue-800 font-semibold"
        >
          &larr; Go to Course Page
        </Link>
      </div>
      <div className="flex flex-col gap-4  p-6">
        <ChapterForm
          lessonId={lessonId as string}
          courseId={courseId as string}
          chapterId={data?.chapterId || ""}
        />
        <TitleForm
          courseid={courseId as string}
          lessonId={lessonId as string}
          title={title}
        />
        <DescriptionForm
          title={title}
          courseid={courseId as string}
          lessonId={lessonId as string}
          description={description}
        />
        <VideoForm
          courseid={courseId as string}
          lessonId={lessonId as string}
          video={video}
        />
        <IsPublishedForm
          courseid={courseId as string}
          lessonId={lessonId as string}
          isPublished={isPublished}
        />
        <IsFreeForm
          courseid={courseId as string}
          lessonId={lessonId as string}
          isFree={isFree}
        />
      </div>
    </div>
  );
}

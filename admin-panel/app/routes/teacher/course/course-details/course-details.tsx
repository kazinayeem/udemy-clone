import { useParams } from "react-router";
import { useGetCourseByIdQuery } from "~/redux/api/courseApi";

export default function CourseDetails() {
  const { courseId } = useParams();
  const { data, isLoading, isError } = useGetCourseByIdQuery(
    courseId as string
  );

  // Required fields to check
  const requiredFields = [
    data?.title,
    data?.description,
    data?.image,
    data?.price,
    data?.categoryId,
  ];

  // Count how many fields are completed
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `${completedFields}/${totalFields}`;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <div className="text-2xl font-semibold">Loading...</div>
        <div className="text-lg">
          Please wait while we load the course details.
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>Error loading course details.</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Course Details</h1>
        <span className="text-lg text-gray-500">{completionText}</span>
      </div>
    </div>
  );
}

import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router";
import { useGetCourseByIdQuery } from "~/redux/api/courseApi";
import CategoryForm from "./_components/category-form";
import ChapterForm from "./_components/chapter-form";
import DescriptionForm from "./_components/description-from";
import DurationForm from "./_components/duration-form";
import ImageUrlForm from "./_components/image-form";
import LanguageForm from "./_components/language-form";
import LevelForm from "./_components/level-form";
import PriceForm from "./_components/price-form";
import IsPublishedForm from "./_components/published-form";
import TitleForm from "./_components/title-from";
export default function CourseDetails() {
  const { courseId } = useParams();
  const { data, isLoading, isError } = useGetCourseByIdQuery(
    courseId as string
  );

  const requiredFields = [
    data?.title,
    data?.description,
    data?.image,
    data?.price,
    data?.categoryId,
    data?.level,
    data?.language,
  ];

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
      <Link
        viewTransition
        to="/teacher/course/show-courses"
        className="inline-flex items-center gap-2 px-4 py-2 rounded transition"
      >
        <FiArrowLeft className="text-lg" />
        <span className="hover:underline">Go Previous page</span>
      </Link>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ml-6">Course Details</h1>
        <Link
          viewTransition
          className="inline-block px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
          to={`/teacher/course/course-details/${courseId}/fqa/`}
        >
          Add FQA
        </Link>
        <span className="text-lg text-gray-500">{completionText}</span>
      </div>

      <div className="flex flex-col gap-4 container mx-auto p-4">
        <TitleForm
          courseid={courseId as string}
          userid={data?.userId as string}
          title={data?.title as string}
        />
        <DescriptionForm
          title={data?.title as string}
          courseid={courseId as string}
          userid={data?.userId as string}
          description={data?.description as string}
        />

        {/* Price & Category side by side */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <PriceForm
              courseid={courseId as string}
              userid={data?.userId as string}
              price={data?.price as number}
            />
          </div>
          <div className="flex-1">
            <CategoryForm
              categoryId={data?.categoryId as string}
              productId={courseId as string}
            />
          </div>
        </div>
        <DurationForm courseid={courseId as string} duration={data?.duration} />
        {/* Language & Level side by side */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <LanguageForm
              courseid={courseId as string}
              language={data?.language as string}
            />
          </div>
          <div className="flex-1">
            <LevelForm
              courseid={courseId as string}
              level={data?.level as string}
            />
          </div>
        </div>

        <ImageUrlForm
          currentImageUrl={data?.image as string}
          productId={courseId as string}
        />
        <ChapterForm chapters={data.Chapter} courseId={courseId as string} />

        <IsPublishedForm
          courseid={courseId as string}
          isPublished={data?.isPublished as boolean}
        />
      </div>
    </div>
  );
}

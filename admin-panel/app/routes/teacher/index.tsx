import { AlertCircle } from "lucide-react";
import { Link } from "react-router";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useGetCourseByUserIdQuery } from "~/redux/api/userApi";

export default function Index() {
  const { data, isLoading, error } = useGetCourseByUserIdQuery({});

  if (error) {
    return (
      <div className="flex justify-center items-center h-40 text-red-600">
        <AlertCircle className="mr-2" />
        Failed to load course data
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* Card 1 - Your Courses */}
      <Card className="rounded-2xl shadow-md">
        <Link to={"/teacher/course/show-courses"} viewTransition>
          <CardContent className="p-6">
            <h2 className="text-lg font-medium text-gray-700 mb-1">
              Your Courses
            </h2>
            <p className="text-4xl font-bold text-blue-600">
              {isLoading ? (
                <Skeleton className="w-24 h-10" />
              ) : (
                data?.totalCourses ?? 0
              )}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Total number of courses you're teaching
            </p>
          </CardContent>
        </Link>
      </Card>

      {/* Card 2 - Total Buying Courses */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium text-gray-700 mb-1">
            Total Buying Courses
          </h2>
          <p className="text-4xl font-bold text-green-600">
            {isLoading ? (
              <Skeleton className="w-24 h-10" />
            ) : (
              data?.totalSellCount ?? 0
            )}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Total students enrolled in your courses
          </p>
        </CardContent>
      </Card>

      {/* Card 3 - Earnings */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6 flex items-center justify-between gap-6">
          {/* Total Sales */}
          <div>
            <h2 className="text-sm text-muted-foreground mb-1">Total Sales</h2>
            <p className="text-3xl font-semibold text-blue-600">
              {isLoading ? (
                <Skeleton className="w-24 h-8" />
              ) : (
                `৳${data?.totalAmount ?? 0}`
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Revenue before platform fee
            </p>
          </div>

          {/* Your Earnings */}
          <div>
            <h2 className="text-sm text-muted-foreground mb-1">
              Your Earnings (80%)
            </h2>
            <p className="text-3xl font-semibold text-green-600">
              {isLoading ? (
                <Skeleton className="w-24 h-8" />
              ) : (
                `৳${Math.floor((data?.totalAmount ?? 0) * 0.8)}`
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              After 20% platform commission
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Card 4 - Total Student */}
      <Card className="rounded-2xl shadow-md">
        <CardContent className="p-6">
          <h2 className="text-lg font-medium text-gray-700 mb-1">
            Total Student
          </h2>
          <p className="text-4xl font-bold text-green-600">
            {isLoading ? (
              <Skeleton className="w-24 h-10" />
            ) : (
              data?.uniqueStudents ?? 0
            )}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Total number of students enrolled in your courses
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

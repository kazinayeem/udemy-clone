import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import {
  useGetAllStudentsQuery,
  useGetAllTeachersQuery,
  useGetTotalSalesQuery,
  useTotalCoursesQuery,
} from "~/redux/api/adminApi";
import StatCard from "./_components/ReportCard";
import { Users, GraduationCap, BookOpen } from "lucide-react";
import MonthlySalesChart from "./_components/MonthlySalesChart";
import CourseEnrollmentBarChart from "./_components/CourseEnrollmentBarChart";
import { Link } from "react-router";

export default function DashboardStats() {
  const { data: studentsData, isLoading: studentsLoading } =
    useGetAllStudentsQuery({});
  const { data: teachersData, isLoading: teachersLoading } =
    useGetAllTeachersQuery({});
  const { data: coursesData, isLoading: coursesLoading } = useTotalCoursesQuery(
    {}
  );

  const {
    data: salesData,
    isLoading: salesLoading,
    error: salesError,
  } = useGetTotalSalesQuery({});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {/* Total Students Card */}
      <Link to={"/dashboard/students"}>
      <StatCard
        icon={Users}
        iconBg="bg-blue-100"
        title="Total Students"
        value={
          studentsLoading ? (
            <Skeleton className="w-20 h-8" />
          ) : (
            studentsData?.length ?? 0
          )
        }
        color="text-blue-600"
      />
      </Link>

      {/* Total Teachers Card */}
      <Link to={"/dashboard/teachers"}>
      <StatCard
        icon={GraduationCap}
        iconBg="bg-purple-100"
        title="Total Teachers"
        value={
          teachersLoading ? (
            <Skeleton className="w-20 h-8" />
          ) : (
            teachersData?.length ?? 0
          )
        }
        color="text-purple-600"
      />
      </Link>
      {/* Total Courses Card */}
      <StatCard
        icon={BookOpen}
        iconBg="bg-green-100"
        title="Total Courses"
        value={
          coursesLoading ? (
            <Skeleton className="w-20 h-8" />
          ) : (
            coursesData?.totalCourses ?? 0
          )
        }
        color="text-green-600"
      />

      {/* Total Sales Card */}
      <StatCard
        icon={BookOpen}
        iconBg="bg-green-100"
        title="Total Sales"
        value={
          salesLoading ? (
            <Skeleton className="w-20 h-8" />
          ) : salesError ? (
            "Error"
          ) : (
            `৳${salesData?.totalAmount ?? 0}`
          )
        }
        color="text-green-600"
      />

      {/* Monthly Sales Chart */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-4">
        <MonthlySalesChart />
        <CourseEnrollmentBarChart />
      </div>
    </div>
  );
}

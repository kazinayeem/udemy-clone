import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Loader2 } from "lucide-react";
import { useGetSalesReportForTeacherQuery } from "~/redux/api/teacherApi";
import { Card, CardContent } from "~/components/ui/card";

const TeacherSalesReport = () => {
  const { data, error, isLoading } = useGetSalesReportForTeacherQuery();

  if (isLoading) {
    return (
      <Card className="rounded-2xl shadow-md w-full">
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-gray-500" size={32} />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data?.report?.length) {
    return (
      <Card className="rounded-2xl shadow-md w-full">
        <CardContent className="p-6 text-center text-red-500">
          {error
            ? "Failed to load sales report."
            : "No sales data available for your courses."}
        </CardContent>
      </Card>
    );
  }

  const chartData = data.report.map((course: any) => ({
    name: course.title,
    earnings: course.totalEarnings,
    students: course.totalEnrollments,
  }));

  return (
    <Card className="rounded-2xl shadow-md w-full p-4">
      <CardContent className="p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          📊 Course-wise Sales Report
        </h2>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            <Bar
              dataKey="earnings"
              fill="#4ade80"
              name="Total Earnings"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="students"
              fill="#60a5fa"
              name="Total Students"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Summary Section */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">
              Total Enrollments
            </h3>
            <p className="text-2xl font-semibold text-blue-600">
              {data?.totals?.totalEnrollments ?? 0}
            </p>
          </div>
          <div>
            <h3 className="text-sm text-muted-foreground mb-1">
              Total Earnings
            </h3>
            <p className="text-2xl font-semibold text-green-600">
              ৳{data?.totals?.totalEarnings ?? 0}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherSalesReport;

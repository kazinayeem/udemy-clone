import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGetCourseEnrollmentsQuery } from "~/redux/api/adminApi";

const CourseEnrollmentBarChart = () => {
  const { data, isLoading, error } = useGetCourseEnrollmentsQuery({});
  console.log(data, "Course Enrollment Data");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading course enrollments</div>;
  }

  // If data is empty or malformed, return early
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h3>Course Enrollment Bar Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course" /> {/* Use 'course' as the X axis */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="enrollments" fill="#8884d8" />{" "}
          {/* Bar chart for enrollments */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseEnrollmentBarChart;

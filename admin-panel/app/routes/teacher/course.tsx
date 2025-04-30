import { Link } from "react-router";

export default function AddCourse() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add Course</h1>

      {/* Add your form or inputs here */}
      <p className="mb-4 text-gray-600">Use this page to add a new course.</p>

      {/* Show Courses Button */}
      <Link
        to="/teacher/course/add-course"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add New Course
      </Link>

      <Link
        to="/your-courses"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Show Your Courses
      </Link>
    </div>
  );
}

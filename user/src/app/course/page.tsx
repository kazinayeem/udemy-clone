"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Course {
  id: string;
  title: string;
  category: {
    name: string;
  };
  image: string;
  price: number;
  duration: number;
  user: {
    name: string;
  };
}

const CoursePage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async (page: number) => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/client/courses?page=${page}&limit=10`
        );
        const data = await res.json();

        if (data.success) {
          setCourses(data.data);
          setTotalPages(data.pagination.totalPages);
          setCurrentPage(data.pagination.page);
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="py-16 md:px-40 px-8 m-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Courses</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : courses.length === 0 ? (
        <div className="text-center">No courses available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Link
              href={`/course/${course.id}`}
              key={course.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="aspect-video relative">
                <Image
                  fill
                  className="object-cover"
                  src={course.image}
                  alt={course.title}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500">{course.category.name}</p>
                <div className="mt-4">
                  <p className="font-semibold text-gray-700">
                    Price: ${course.price}
                  </p>
                  <p className="text-sm text-gray-600">
                    Duration: {course.duration} hours
                  </p>
                </div>
                <div className="mt-4 text-right">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:bg-gray-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CoursePage;

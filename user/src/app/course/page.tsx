"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LucideClock, LucideDollarSign, LucideUser } from "lucide-react";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search");

  const [searchText, setSearchText] = useState<string>("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setSearchText(search || "");
  }, [search]);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${
            process.env.NEXT_PUBLIC_SERVER
          }/client/courses?page=${currentPage}&limit=10&search=${search || ""}`
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

    fetchCourses();
  }, [currentPage, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchText.trim();
    setCurrentPage(1);
    router.push(
      `/course${query ? `?search=${encodeURIComponent(query)}` : ""}`
    );
  };

  const renderSkeletons = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="w-full h-full flex flex-col">
            <Skeleton className="h-48 w-full rounded-t-md" />
            <CardContent className="flex-1 p-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </CardContent>
            <CardFooter className="p-4">
              <Skeleton className="h-8 w-full rounded-md" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="py-16 md:px-40 px-8 m-auto">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/course">Courses</BreadcrumbLink>
          </BreadcrumbItem>
          {searchText && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/course?search=${encodeURIComponent(searchText)}`}
                >
                  {searchText}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Search */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center gap-4 mb-8 justify-center"
      >
        <Input
          placeholder="Search courses..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full max-w-md"
        />
        <Button type="submit">Search</Button>
      </form>

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-2 text-center">Available Courses</h1>
      <div className="text-center mb-8">
        {searchText ? (
          <h2 className="text-lg text-gray-600">
            Search results for:{" "}
            <span className="font-semibold text-gray-800">"{searchText}"</span>
          </h2>
        ) : (
          <h2 className="text-lg text-gray-600">All available courses</h2>
        )}
      </div>

      {/* Course List */}
      {loading ? (
        renderSkeletons()
      ) : courses.length === 0 ? (
        <div className="text-center">No courses available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Link href={`/course/${course.id}`}>
              <Card
                key={course.id}
                className="w-full h-[320px] flex flex-col overflow-hidden"
              >
                <div className="relative  w-full">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={300}
                    height={300}
                    objectFit="cover"
                    className="rounded-t-md"
                  />
                </div>
                <CardContent className="flex-1 p-4 flex flex-col">
                  <CardTitle className="text-sm font-semibold mb-1 line-clamp-2">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-gray-500 mb-2 line-clamp-1">
                    {course.category.name}
                  </CardDescription>
                  <div className="flex items-center text-xs text-gray-600 space-x-4 mt-auto">
                    <div className="flex items-center">
                      <LucideDollarSign className="w-4 h-4 mr-1" />$
                      {course.price}
                    </div>
                    <div className="flex items-center">
                      <LucideClock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center gap-4">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="secondary"
        >
          Previous
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="secondary"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CoursePage;

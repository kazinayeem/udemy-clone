import React, { useState } from "react";
import {
  useGetAllCourseQuery,
  useApprovedCourseMutation,
  useUnapprovedCourseMutation,
} from "~/redux/api/adminApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { toast } from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router";

export default function AllCourse() {
  const { data, isLoading, isError, refetch } = useGetAllCourseQuery({});
  const [approveCourse] = useApprovedCourseMutation();
  const [unapproveCourse] = useUnapprovedCourseMutation();

  // Advanced search states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleApprovalToggle = async (courseId: string, isApproved: boolean) => {
    try {
      if (isApproved) {
        await unapproveCourse(courseId).unwrap();
        toast.success("Course unapproved successfully");
      } else {
        await approveCourse(courseId).unwrap();
        toast.success("Course approved successfully");
      }
      refetch();
    } catch (err) {
      toast.error("Failed to update course status");
    }
  };

  // Filtering logic based on search and filter states
  const filteredCourses = data?.filter((course: any) => {
    const query = searchQuery.toLowerCase();
    const isTitleMatch = course.title?.toLowerCase().includes(query);
    const isLanguageMatch = selectedLanguage
      ? course.language?.toLowerCase() === selectedLanguage.toLowerCase()
      : true;
    const isLevelMatch = selectedLevel
      ? course.level?.toLowerCase() === selectedLevel.toLowerCase()
      : true;
    const isPriceMatch =
      course.price >= priceRange[0] && course.price <= priceRange[1];

    return (
      isTitleMatch &&
      isLanguageMatch &&
      isLevelMatch &&
      isPriceMatch
    );
  });

  if (isLoading) {
    return (
      <Card className="p-4 space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="p-4 text-red-500 font-semibold">
        Error: Failed to fetch courses.
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Advanced Search Filters */}
      <Card className="p-4 mb-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Advanced Search</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search by Title */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Course Title</label>
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Search by Language */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Language</label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Languages</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Bengali">Bengali</option>
              {/* Add more languages here */}
            </select>
          </div>

          {/* Search by Level */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Price Range</label>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([+e.target.value, priceRange[1]])
                }
                className="w-full"
              />
              <span className="text-sm font-medium">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], +e.target.value])
              }
              className="w-full mt-2"
            />
          </div>
        </div>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>View</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses?.map((course: any) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title?.slice(0, 20)}..</TableCell>
                  <TableCell>{course.user?.name || "Unknown"}</TableCell>
                  <TableCell>{course.language}</TableCell>
                  <TableCell>{course.level}</TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell>
                    {course.approval ? (
                      <span className="text-green-600 font-medium">
                        Approved
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-medium">
                        Pending
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={course.approval ? "destructive" : "default"}
                      size="sm"
                      onClick={() =>
                        handleApprovalToggle(course.id, course.approval)
                      }
                    >
                      {course.approval ? (
                        <>
                          <XCircle className="w-4 h-4 mr-1" />
                          Unapprove
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </>
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Link
                      viewTransition
                      to={`/dashboard/course-management/details/${course.id}`}
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

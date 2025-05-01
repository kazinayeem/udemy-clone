import React from "react";
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

export default function AllCourse() {
  const { data, isLoading, isError, refetch } = useGetAllCourseQuery({});
  const [approveCourse] = useApprovedCourseMutation();
  const [unapproveCourse] = useUnapprovedCourseMutation();

  const handleApprovalToggle = async (
    courseId: string,
    isApproved: boolean
  ) => {
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
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">All Courses</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((course: any) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

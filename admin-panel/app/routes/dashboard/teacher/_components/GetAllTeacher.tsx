import React, { useState } from "react";
import {
  useGetAllTeachersQuery,
  useBannedTeacherMutation,
  useUnBannedTeacherMutation,
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
import { CheckCircle, XCircle, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import { Input } from "~/components/ui/input";

interface Teacher {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  bio?: string;
  course?: string[]; // Assuming it's an array of course names
}

export default function GetAllTeachers() {
  const { data, isLoading, isError, refetch } = useGetAllTeachersQuery({});
  const [bannedTeacher] = useBannedTeacherMutation();
  const [unBannedTeacher] = useUnBannedTeacherMutation();
  const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  const handleBanUnban = async (teacherId: string, isActive: boolean) => {
    try {
      if (isActive) {
        await bannedTeacher(teacherId).unwrap();
        toast.success("Teacher banned successfully");
      } else {
        await unBannedTeacher(teacherId).unwrap();
        toast.success("Teacher unbanned successfully");
      }
      refetch();
    } catch (error) {
      toast.error("Failed to update teacher status");
    }
  };

  const filteredTeachers = data?.filter((teacher: Teacher) => {
    const query = searchQuery.toLowerCase();
    const isNameMatch = teacher.name.toLowerCase().includes(query);
    const isEmailMatch = teacher.email.toLowerCase().includes(query);

    const isCourseMatch =
      Array.isArray(teacher.course) &&
      teacher.course.some(
        (course) =>
          typeof course === "string" && course.toLowerCase().includes(query)
      );

    return isNameMatch || isEmailMatch || isCourseMatch;
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
        Error: Failed to fetch teachers.
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Teachers</h2>
        <Input
          type="search"
          placeholder="Search teachers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded-md w-1/3"
        />
      </div>

      <Card>
        <CardContent className="p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Course</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeachers?.map((teacher: Teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell>{teacher.role}</TableCell>
                  <TableCell className="text-center">
                    {teacher.course?.length || 0}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {/* Ban/Unban Toggle */}
                    <Button
                      variant={teacher.isActive ? "destructive" : "outline"}
                      size="sm"
                      onClick={() =>
                        handleBanUnban(teacher.id, teacher.isActive)
                      }
                    >
                      {teacher.isActive ? (
                        <>
                          <XCircle className="w-4 h-4 mr-1" />
                          Ban
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Unban
                        </>
                      )}
                    </Button>

                    {/* View Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewTeacher(teacher)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Teacher Modal */}
      {viewTeacher && (
        <Card className="p-4 space-y-4">
          <h3 className="text-xl font-semibold">Teacher Details</h3>
          <div>
            <strong>Name:</strong> {viewTeacher.name}
          </div>
          <div>
            <strong>Email:</strong> {viewTeacher.email}
          </div>
          <div>
            <strong>Role:</strong> {viewTeacher.role}
          </div>
          <div>
            <strong>Total Course:</strong> {viewTeacher.course?.length || 0}
          </div>
          <div>
            <strong>Bio:</strong> {viewTeacher.bio || "Not available"}
          </div>
          <Button
            variant="outline"
            onClick={() => setViewTeacher(null)}
            size="sm"
          >
            Close
          </Button>
        </Card>
      )}
    </div>
  );
}

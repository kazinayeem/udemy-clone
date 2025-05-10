import React, { useState } from "react";
import {
  useGetAllStudentsQuery,
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
import { Input } from "~/components/ui/input"; // Assuming ShadCN input component

interface Teacher {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  bio?: string;
  enrollment?: any[];
}

export default function GetAllTeachers() {
  const { data, isLoading, isError, refetch } = useGetAllStudentsQuery({});
  const [bannedTeacher] = useBannedTeacherMutation();
  const [unBannedTeacher] = useUnBannedTeacherMutation();
  const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);

  const [searchName, setSearchName] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [searchRole, setSearchRole] = useState<string>("");
  const [searchStatus, setSearchStatus] = useState<boolean | null>(null);

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

  // Filter teachers based on search inputs
  const filteredTeachers = data?.filter((teacher: Teacher) => {
    return (
      (teacher.name.toLowerCase().includes(searchName.toLowerCase()) ||
        searchName === "") &&
      (teacher.email.toLowerCase().includes(searchEmail.toLowerCase()) ||
        searchEmail === "") &&
      (teacher.role.toLowerCase().includes(searchRole.toLowerCase()) ||
        searchRole === "") &&
      (searchStatus === null || teacher.isActive === searchStatus)
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
        Error: Failed to fetch teachers.
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">All Students</h2>

          {/* Advanced Search Filters */}
          <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block mb-2">Search by Name</label>
              <Input
                type="text"
                placeholder="Enter name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2">Search by Email</label>
              <Input
                type="email"
                placeholder="Enter email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2">Search by Role</label>
              <Input
                type="text"
                placeholder="Enter role"
                value={searchRole}
                onChange={(e) => setSearchRole(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2">Filter by Status</label>
              <select
                className="w-full p-2 border rounded-md"
                value={searchStatus !== null ? String(searchStatus) : ""}
                onChange={(e) =>
                  setSearchStatus(
                    e.target.value === "" ? null : e.target.value === "true"
                  )
                }
              >
                <option value="">All Statuses</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* Teachers Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Enrollments</TableHead>
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
                    {teacher.enrollment?.length || 0}
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
            <strong>Total Enrollments:</strong>{" "}
            {viewTeacher.enrollment?.length || 0}
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

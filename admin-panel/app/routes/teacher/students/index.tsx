// ~/components/TeacherStudents.tsx

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useGetStudentsForTeacherQuery } from "~/redux/api/teacherApi";

interface StudentEntry {
  student: {
    name: string;
    email: string;
    country: string;
    phone: number;
    address: string;
  };
  courseTitle: string;
}

const TeacherStudents = () => {
  const { data, isLoading, error } = useGetStudentsForTeacherQuery({});
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter students based on search query (case-insensitive and partial match)
  const filteredStudents = data?.students.filter((entry: StudentEntry) => {
    const query = searchQuery.toLowerCase();
    return (
      entry.student.name.toLowerCase().includes(query) ||
      entry.student.email.toLowerCase().includes(query) ||
      entry.courseTitle.toLowerCase().includes(query)
    );
  });

  const handleViewDetails = (student: any) => {
    setSelectedStudent(student);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading students.</p>;

  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">Your Students</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or course"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-lg w-full"
        />
      </div>

      {/* ShadCN Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStudents?.map((entry: StudentEntry, idx: number) => (
            <TableRow key={idx}>
              <TableCell>{entry.student.name}</TableCell>
              <TableCell>{entry.student.email}</TableCell>
              <TableCell>{entry.courseTitle}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <button
                      className="text-blue-600"
                      onClick={() => handleViewDetails(entry.student)}
                    >
                      View Details
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>Student Details</AlertDialogTitle>
                    <AlertDialogDescription>
                      <div>
                        <strong>Name:</strong> {selectedStudent?.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {selectedStudent?.email}
                      </div>
                      <div>
                        <strong>Phone:</strong> {selectedStudent?.phone}
                      </div>
                      <div>
                        <strong>Address:</strong> {selectedStudent?.address}
                      </div>
                      <div>
                        <strong>Country:</strong> {selectedStudent?.country}
                      </div>
                    </AlertDialogDescription>
                    <AlertDialogAction>
                      <button className="text-red-600">Close</button>
                    </AlertDialogAction>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeacherStudents;

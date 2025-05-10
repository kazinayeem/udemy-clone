import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetCoursesQuery } from "~/redux/api/courseApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Input } from "~/components/ui/input"; 

interface Course {
  id: string;
  title: string;
  price: number;
  isPublished: boolean;
  approval: boolean;
}

export default function AllCourse() {
  const { data: courses, isLoading } = useGetCoursesQuery({});
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleEdit = (id: string) => {
    navigate(`/teacher/course/course-details/${id}`, { viewTransition: true });
  };

  const handleDelete = (id: string) => {
    console.log("Delete course:", id);
  };

  const filteredCourses = courses?.filter((course: Course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6">Loading courses...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>

      {/* Search Input */}
      <div className="mb-4">
        <Input
          placeholder="Search courses by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-md"
        />
      </div>

      {/* ShadCN Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Approved</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredCourses?.map((course: Course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>${course.price}</TableCell>
              <TableCell>{course.approval ? "Yes" : "No"}</TableCell>
              <TableCell>{course.isPublished ? "Yes" : "No"}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(course.id)}
                >
                  <Pencil size={16} />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(course.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

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

interface Course {
  id: string;
  title: string;
  price: number;
  isPublished: boolean;
}
export default function AllCourse() {
  const { data: courses, isLoading } = useGetCoursesQuery({});
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/teacher/course/course-details/${id}`);
  };

  const handleDelete = (id: string) => {
    // You can implement delete logic here or add a mutation
    console.log("Delete course:", id);
  };

  if (isLoading) {
    return <div className="p-6">Loading courses...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {courses?.map((course: Course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>${course.price}</TableCell>
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

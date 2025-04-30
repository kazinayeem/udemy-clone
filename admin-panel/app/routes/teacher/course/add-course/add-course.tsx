import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useAddCourseMutation } from "~/redux/api/courseApi";

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [addCourse, { isLoading, isSuccess, error }] = useAddCourseMutation();
  const navigate = useNavigate();
  const handleAddCourse = async () => {
    if (courseName.trim() === "") {
      toast.error("Course name is required.");
      return;
    }

    try {
      const res = await addCourse({ title: courseName }).unwrap();
      setCourseName("");
      navigate(`/teacher/course/course-details/${res.id}`);
      toast.success("Course added successfully!");
    } catch (err) {
      console.error("Failed to add course:", err);
      if (error) {
        toast.error("Failed to add course. Please try again.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="w-full max-w-xl px-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Add a New Course
        </h1>

        <div className="space-y-6">
          <div>
            <Label htmlFor="courseName" className="text-lg">
              Course Name
            </Label>
            <Input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              id="courseName"
              placeholder="Name your course"
              className="mt-2"
            />
          </div>

          <Button
            onClick={handleAddCourse}
            className="w-full text-lg py-6"
            variant="default"
          >
            {isLoading ? "Adding..." : "Add Course"}
          </Button>
        </div>
      </div>
    </div>
  );
}

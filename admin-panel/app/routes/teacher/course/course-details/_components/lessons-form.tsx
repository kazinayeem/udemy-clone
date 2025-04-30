import { useState } from "react";
import { Edit, Trash, Plus } from "lucide-react";
import { Input } from "~/components/ui/input";
import { useAddLessonMutation } from "~/redux/api/courseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface Lesson {
  id: string;
  title: string;
  isFree: boolean;
  isPublished: boolean;
}

interface LessonsFormProps {
  courseid: string;
  lessons: Lesson[];
}

export default function LessonsForm({ courseid, lessons }: LessonsFormProps) {
  const [lessonName, setLessonName] = useState<string>("");
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addLesson, { isLoading }] = useAddLessonMutation();
  const navigate = useNavigate();

  const handleEdit = (lessonId: string) => {
    navigate(`/teacher/course/course-details/${courseid}/lessons/${lessonId}`);
  };

  const handleDelete = (lessonIndex: number) => {
    console.log("Delete lesson at index", lessonIndex);
  };

  const handleAddLesson = async () => {
    try {
      await addLesson({ courseId: courseid, title: lessonName }).unwrap();
      setLessonName("");
      setIsAdding(false);
      toast.success("Lesson added successfully!");
    } catch (error) {
      toast.error("Error adding lesson. Please try again.");
      console.log("Error adding lesson:", error);
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-lg">
      {lessons && lessons.length > 0 ? (
        <div className="flex flex-col gap-4">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="flex justify-between items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 rounded-md transition-all"
            >
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{lesson.title}</span>
                <span className="text-sm text-gray-500">
                  {lesson.isFree ? "Free" : "Paid"} |{" "}
                  {lesson.isPublished ? "Published" : "Unpublished"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(lesson.id)}
                  className="text-blue-500 hover:text-blue-700 transition-all"
                  aria-label="Edit Lesson"
                >
                  <Edit />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700 transition-all"
                  aria-label="Delete Lesson"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No lessons available.</p>
      )}

      {/* Plus button to add a new lesson */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 text-green-500 hover:text-green-700 transition-all py-2 px-4 rounded-md"
        >
          <Plus />
          {isAdding ? "Adding..." : "Add Lesson"}
        </button>
      </div>

      {/* Conditional input field for adding a new lesson */}
      {isAdding && (
        <div className="flex flex-col gap-4 mt-6">
          <Input
            type="text"
            placeholder="Enter lesson title"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddLesson}
              className="bg-blue-500 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-600 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Lesson"}
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

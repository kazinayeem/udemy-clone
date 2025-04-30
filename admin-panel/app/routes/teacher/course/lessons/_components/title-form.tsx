import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useUpdateLessonsMutation } from "~/redux/api/courseApi";

interface TitleFormProps {
  lessonId: string;
  courseid: string;
  title: string;
}

export default function TitleForm(props: TitleFormProps) {
  const { lessonId, courseid, title: propsTitle } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(propsTitle);

  const [updateLessons, { isError, isLoading, isSuccess }] =
    useUpdateLessonsMutation();

  const handleSave = async () => {
    if (title !== propsTitle) {
      try {
        await updateLessons({
          courseId: courseid,
          lessonId: lessonId,
          title,
        }).unwrap();
        setIsEditing(false);
        toast.success("Course title updated successfully!");
      } catch (error) {
        toast.error("Failed to update course title.");
        console.error("Error updating course:", error);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div>
        {!isEditing ? (
          <p
            className="text-lg font-semibold cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
            <span className="text-sm text-gray-500">
              {" "}
              (double-click to edit)
            </span>
          </p>
        ) : (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Course Title"
            className="w-full"
          />
        )}
      </div>

      {/* Edit/Save button */}
      <Button
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className="ml-4"
        disabled={isLoading} // Disable the button while loading
      >
        {isEditing ? "Save" : "Edit"}
        <Pencil className="ml-2" size={16} />
      </Button>
      {isLoading && <p>Saving...</p>}
    </div>
  );
}

import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useUpdateCourseMutation } from "~/redux/api/courseApi";

interface LevelFormProps {
  courseid: string;
  level: string;
}

const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];

export default function LevelForm({
  courseid,
  level: propsLevel,
}: LevelFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [level, setLevel] = useState(propsLevel);

  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const handleSave = async () => {
    if (level !== propsLevel) {
      try {
        await updateCourse({ id: courseid, level }).unwrap();
        setIsEditing(false);
        toast.success("Course level updated successfully!");
      } catch (error) {
        toast.error("Failed to update course level.");
        console.error("Error updating course:", error);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="w-full">
        {!isEditing ? (
          <p
            className="text-lg font-semibold cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            Level: {level}
            <span className="text-sm text-gray-500">
              {" "}
              (double-click to edit)
            </span>
          </p>
        ) : (
          <Select value={level} onValueChange={(value) => setLevel(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((lvl) => (
                <SelectItem key={lvl} value={lvl}>
                  {lvl}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Edit/Save button */}
      <Button
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className="ml-4"
        disabled={isLoading}
      >
        {isEditing ? "Save" : "Edit"}
        <Pencil className="ml-2" size={16} />
      </Button>

      {isLoading && <p className="text-sm text-gray-500 mt-2">Saving...</p>}
    </div>
  );
}

import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useUpdateCourseMutation } from "~/redux/api/courseApi";

interface durationProps {
  courseid: string;
  duration: number;
}

export default function DurationForm({
  courseid,
  duration: Propsduration,
}: durationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [duration, setduration] = useState<number>(Propsduration);

  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const handleSave = async () => {
    if (duration !== Propsduration) {
      try {
        await updateCourse({ id: courseid, duration }).unwrap();
        setIsEditing(false);
        toast.success("Course duration updated successfully!");
      } catch (error) {
        toast.error("Failed to update course duration.");
        console.error("Error updating course:", error);
      }
    } else {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center justify-between container mx-auto p-4 bg-white shadow-sm rounded-sm">
      <div>
        {!isEditing ? (
          <p
            className="text-lg font-semibold cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            {duration && duration > 0
              ? `${duration.toFixed(0)} Hours`
              : "Set Course duration"}

            <span className="text-sm text-gray-500">
              {" "}
              (double-click to edit)
            </span>
          </p>
        ) : (
          <Input
            type="number"
            value={duration}
            onChange={(e) => setduration(parseFloat(e.target.value))}
            placeholder="Course duration"
            className="w-full"
          />
        )}
      </div>

      <Button
        onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        className="ml-4"
        disabled={isLoading}
      >
        {isEditing ? "Save" : "Edit"}
        <Pencil className="ml-2" size={16} />
      </Button>

      {isLoading && <p className="text-sm text-gray-500 ml-2">Saving...</p>}
    </div>
  );
}

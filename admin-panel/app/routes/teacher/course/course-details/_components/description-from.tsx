import { useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { useUpdateCourseMutation } from "~/redux/api/courseApi";

interface DescriptionFormProps {
  userid: string;
  courseid: string;
  description: string;
}

export default function DescriptionForm({
  userid,
  courseid,
  description: propsDescription,
}: DescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(propsDescription);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const handleSave = async () => {
    if (description !== propsDescription) {
      try {
        await updateCourse({ id: courseid, description }).unwrap();
        toast.success("Course description updated successfully!");
      } catch (error) {
        toast.error("Failed to update course description.");
        console.error("Update error:", error);
      }
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4 container mx-auto p-4 bg-white shadow-md rounded-lg">
      {!isEditing ? (
        <p
          className=" text-lg font-semibold leading-relaxed cursor-pointer whitespace-pre-wrap"
          onDoubleClick={() => setIsEditing(true)}
        >
          {description}
          <span className="text-sm text-gray-500"> (double-click to edit)</span>
        </p>
      ) : (
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-48 p-2 border rounded resize-none"
          placeholder="Edit course description..."
        />
      )}

      <div className="flex items-center justify-between">
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          disabled={isLoading}
        >
          {isEditing ? "Save" : "Edit"}
          <Pencil className="ml-2" size={16} />
        </Button>
        {isLoading && <p className="text-sm text-gray-500">Saving...</p>}
      </div>
    </div>
  );
}

import { useState } from "react";
import toast from "react-hot-toast";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { useUpdateLessonsMutation } from "~/redux/api/courseApi";

interface IsPublishedFormProps {
  lessonId: string;
  courseid: string;
  isFree: boolean;
}

export default function IsFreeForm({
  courseid,
  lessonId,
  isFree: propsPublished,
}: IsPublishedFormProps) {
  const [isPublished, setIsPublished] = useState(propsPublished);
  const [updateLessons, { isError, isLoading, isSuccess }] =
    useUpdateLessonsMutation();

  const handleToggle = async (checked: boolean) => {
    setIsPublished(checked);
    try {
      await updateLessons({
        courseId: courseid,
        lessonId: lessonId,
        isFree: checked,
      }).unwrap();
      toast.success(`Course ${checked ? "Free" : "Paid"} successfully!`);
    } catch (error) {
      toast.error("Failed to update publish status.");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        <Label htmlFor="free">Free</Label>
        <Switch
          id="free"
          checked={isPublished}
          onCheckedChange={handleToggle}
          disabled={isLoading}
        />
      </div>
      {isLoading && <p className="text-sm text-gray-500 mt-2">Saving...</p>}
    </div>
  );
}

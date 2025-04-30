import { useState } from "react";
import toast from "react-hot-toast";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { useUpdateCourseMutation } from "~/redux/api/courseApi";

interface IsPublishedFormProps {
  courseid: string;
  isPublished: boolean;
}

export default function IsPublishedForm({
  courseid,
  isPublished: propsPublished,
}: IsPublishedFormProps) {
  const [isPublished, setIsPublished] = useState(propsPublished);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const handleToggle = async (checked: boolean) => {
    setIsPublished(checked);
    try {
      await updateCourse({ id: courseid, isPublished: checked }).unwrap();
      toast.success(
        `Course ${checked ? "published" : "unpublished"} successfully!`
      );
    } catch (error) {
      toast.error("Failed to update publish status.");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="flex items-center justify-between container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        <Label htmlFor="published">Published</Label>
        <Switch
          id="published"
          checked={isPublished}
          onCheckedChange={handleToggle}
          disabled={isLoading}
        />
      </div>
      {isLoading && <p className="text-sm text-gray-500 mt-2">Saving...</p>}
    </div>
  );
}

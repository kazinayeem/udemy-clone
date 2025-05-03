import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { useUpdateLessonsMutation } from "~/redux/api/courseApi";

interface DescriptionFormProps {
  lessonId: string;
  courseid: string;
  description: string;
}

export default function DescriptionForm({
  lessonId,
  courseid,
  description: propsDescription,
}: DescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [ReactQuill, setReactQuill] = useState<any>(null);
  useEffect(() => {
    import("react-quill-new").then((mod) => {
      import("react-quill-new/dist/quill.snow.css");
      setReactQuill(() => mod.default);
    });
  }, []);
  const [description, setDescription] = useState(propsDescription);
  const [updateLessons, { isError, isLoading, isSuccess }] =
    useUpdateLessonsMutation();

  const handleSave = async () => {
    if (description !== propsDescription) {
      try {
        await updateLessons({
          courseId: courseid,
          lessonId: lessonId,
          description,
        }).unwrap();
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
        <>
          <p
            className=" text-lg font-semibold leading-relaxed cursor-pointer whitespace-pre-wrap"
            onDoubleClick={() => setIsEditing(true)}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <span className="text-sm text-gray-500"> (double-click to edit)</span>
        </>
      ) : (
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="w-full bg-white"
          theme="snow"
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

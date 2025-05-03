import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { useUpdateCourseMutation } from "~/redux/api/courseApi";

interface DescriptionFormProps {
  userid: string;
  courseid: string;
  description: string;
}

export default function DescriptionForm({
  courseid,
  description: propsDescription,
}: DescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(propsDescription);
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  useEffect(() => {
    // Dynamically import ReactQuill only on the client
    import("react-quill-new").then((mod) => {
      import("react-quill-new/dist/quill.snow.css");
      setReactQuill(() => mod.default);
    });
  }, []);

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
          className="text-lg font-semibold leading-relaxed cursor-pointer whitespace-pre-wrap"
          onDoubleClick={() => setIsEditing(true)}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : ReactQuill ? (
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="w-full bg-white"
          theme="snow"
        />
      ) : (
        <p>Loading editor...</p>
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

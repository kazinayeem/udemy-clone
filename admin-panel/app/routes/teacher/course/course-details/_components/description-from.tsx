import { Pencil, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { useUpdateCourseMutation } from "~/redux/api/courseApi";

interface DescriptionFormProps {
  userid: string;
  courseid: string;
  description: string;
  title: string;
}

export default function DescriptionForm({
  courseid,
  description: propsDescription,
  title,
}: DescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(propsDescription);
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
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

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(
        "http://localhost:8080/api/generate-description",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );

      const data = await res.json();

      if (res.ok && data.description) {
        setDescription(data.description);
        toast.success("Generated description!");
        setIsEditing(true); // Optional: automatically open editor
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error: any) {
      toast.error("Failed to generate description.");
      console.error("Generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 container mx-auto p-4 bg-white shadow-md rounded-lg">
      {!isEditing ? (
        <p
          className="text-sm font-semibold leading-relaxed cursor-pointer whitespace-pre-wrap"
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
        <div className="flex gap-2">
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={isLoading}
          >
            {isEditing ? "Save" : "Edit"}
            <Pencil className="ml-2" size={16} />
          </Button>

          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Generate"}
            <Sparkles className="ml-2" size={16} />
          </Button>
        </div>

        {(isLoading || isGenerating) && (
          <p className="text-sm text-gray-500">
            {isLoading ? "Saving..." : "Generating..."}
          </p>
        )}
      </div>
    </div>
  );
}

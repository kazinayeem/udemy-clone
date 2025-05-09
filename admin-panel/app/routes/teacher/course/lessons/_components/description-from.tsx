import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { useUpdateLessonsMutation } from "~/redux/api/courseApi";

interface DescriptionFormProps {
  lessonId: string;
  courseid: string;
  description: string;
  title: string; // Adding title prop for AI generation
}

export default function DescriptionForm({
  lessonId,
  courseid,
  description: propsDescription,
  title, // Destructuring title prop
}: DescriptionFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(propsDescription);
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false); // NEW: State for AI generation status
  const [updateLessons, { isError, isLoading, isSuccess }] =
    useUpdateLessonsMutation();

  useEffect(() => {
    import("react-quill-new").then((mod) => {
      import("react-quill-new/dist/quill.snow.css");
      setReactQuill(() => mod.default);
    });
  }, []);

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

  // AI Description Generation Handler
  const handleGenerateDescription = async () => {
    setIsGenerating(true); // Start AI generation

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_API}/generate-description`,
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
        setIsEditing(true);
        toast.success("AI-generated description loaded!");
      } else {
        throw new Error("No description returned");
      }
    } catch (error) {
      toast.error("Failed to generate description.");
      console.error("AI generation error:", error);
    }

    setIsGenerating(false); // End AI generation
  };

  return (
    <div className="flex flex-col gap-4 container mx-auto p-4 bg-white shadow-md rounded-lg">
      {!isEditing ? (
        <>
          <p
            className="text-sm font-semibold leading-relaxed cursor-pointer whitespace-pre-wrap"
            onDoubleClick={() => setIsEditing(true)}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <span className="text-sm text-gray-500"> (double-click to edit)</span>
        </>
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

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          disabled={isLoading}
        >
          {isEditing ? "Save" : "Edit"}
          <Pencil className="ml-2" size={16} />
        </Button>

        {/* Generate with AI button */}
        <Button
          variant="outline"
          onClick={handleGenerateDescription}
          disabled={isGenerating || isLoading} // Disable if generating or saving
        >
          {isGenerating ? "Generating..." : "Generate with AI 🤖"}{" "}
          {/* Change button text */}
        </Button>

        {isLoading && <p className="text-sm text-gray-500">Saving...</p>}
      </div>
    </div>
  );
}

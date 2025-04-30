import { Pencil } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { useUpdateCourseMutation } from "~/redux/api/courseApi";

interface LanguageFormProps {
  courseid: string;
  language: string;
}

const commonLanguages = [
  "English",
  "Spanish",
  "Hindi",
  "Mandarin",
  "French",
  "Arabic",
  "Portuguese",
  "Russian",
  "German",
  "Japanese",
  "Korean",
  "Italian",
  "Bengali",
  "Urdu",
  "Turkish",
  "Vietnamese",
];

export default function LanguageForm({
  courseid,
  language: propsLanguage,
}: LanguageFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [language, setLanguage] = useState(propsLanguage);

  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const handleSave = async () => {
    if (language !== propsLanguage) {
      try {
        await updateCourse({ id: courseid, language }).unwrap();
        setIsEditing(false);
        toast.success("Language updated successfully!");
      } catch (error) {
        toast.error("Failed to update language.");
        console.error("Update error:", error);
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
            Language: {language}
            <span className="text-sm text-gray-500">
              {" "}
              (double-click to edit)
            </span>
          </p>
        ) : (
          <Select value={language} onValueChange={(val) => setLanguage(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {commonLanguages.map((lang) => (
                <SelectItem key={lang} value={lang}>
                  {lang}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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

      {isLoading && <p className="text-sm text-gray-500 mt-2">Saving...</p>}
    </div>
  );
}

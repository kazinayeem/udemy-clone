import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Pencil } from "lucide-react"; // Pencil icon from lucide-react
import { useUpdateCourseMutation } from "~/redux/api/courseApi";

interface ImageUrlFormProps {
  productId: string;
  currentImageUrl: string | null;
}

export default function ImageUrlForm({
  productId,
  currentImageUrl,
}: ImageUrlFormProps) {
  const [imageUrl, setImageUrl] = useState<string>(currentImageUrl ?? "");
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl ?? ""
  );
  const [isEditing, setIsEditing] = useState(false); // Track if we are in edit mode
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    const validUrl = url.match(/\.(jpeg|jpg|gif|png)$/);
    if (validUrl) {
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSave = async () => {
    if (imageUrl !== currentImageUrl) {
      try {
        await updateCourse({ id: productId, image: imageUrl }).unwrap();
        toast.success("Image updated successfully!");
      } catch (error) {
        toast.error("Failed to update image.");
        console.error("Update error:", error);
      }
    }
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="flex items-center justify-between container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-col gap-4 w-full">
        {/* If we are editing, show the input field */}
        {isEditing ? (
          <>
            <label className="text-sm font-medium">Product Image URL</label>
            <Input
              type="text"
              value={imageUrl}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="w-full"
              disabled={isLoading}
            />
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Image preview"
                  className="w-48 h-48 object-cover rounded border"
                />
              </div>
            )}
            <Button
              onClick={handleSave}
              className="mt-4"
              disabled={isLoading || !previewUrl}
            >
              Save Image
            </Button>
          </>
        ) : (
          // If not editing, display the image and an edit icon
          <>
            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Image preview"
                  className="w-48 h-48 object-cover rounded border"
                />
              </div>
            )}
          </>
        )}
      </div>
      {!isEditing && (
        <Button
          onClick={() => setIsEditing(true)}
          className=" top-0 right-0 p-1 bg-gray-300 rounded-full shadow-md hover:bg-gray-400"
        >
          <Pencil size={16} color="black" />
        </Button>
      )}
      {isLoading && <p className="text-sm text-gray-500 mt-2">Saving...</p>}
    </div>
  );
}

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Pencil } from "lucide-react";
import { useUpdateCourseMutation } from "~/redux/api/courseApi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ImageUrlFormProps {
  productId: string;
  currentImageUrl: string | null;
}

export default function ImageUrlForm({
  productId,
  currentImageUrl,
}: ImageUrlFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [updateCourse, { isLoading }] = useUpdateCourseMutation();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!imageFile) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("image", imageFile);
      if (currentImageUrl) formData.append("secure_url", currentImageUrl);

      const res = await fetch("http://localhost:8080/api/course/image/upload", {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      const uploadedImageUrl = data.url;

      await updateCourse({ id: productId, image: uploadedImageUrl }).unwrap();

      toast.success("Image updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update image.");
      console.error("Upload/Update error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-between container mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="flex flex-col gap-4 w-full">
        {isEditing ? (
          <>
            <label className="text-sm font-medium">Upload Product Image</label>
            <div>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isLoading || isUploading}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? "Uploading..." : "Choose Image"}
              </label>
            </div>

            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded border"
                />
              </div>
            )}

            <Button
              onClick={handleSave}
              className="mt-4 flex items-center gap-2"
              disabled={isLoading || !imageFile || isUploading}
            >
              {isUploading && (
                <AiOutlineLoading3Quarters className="animate-spin" size={18} />
              )}
              Save Image
            </Button>
          </>
        ) : (
          previewUrl && (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Current"
                className="w-48 h-48 object-cover rounded border"
              />
            </div>
          )
        )}
      </div>

      {!isEditing && (
        <Button
          onClick={() => setIsEditing(true)}
          className="top-0 right-0 p-1 bg-gray-300 rounded-full shadow-md hover:bg-gray-400"
        >
          <Pencil size={16} color="black" />
        </Button>
      )}

      {(isLoading || isUploading) && (
        <p className="text-sm text-gray-500 mt-2">Uploading...</p>
      )}
    </div>
  );
}

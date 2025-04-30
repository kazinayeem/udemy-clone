import { Pencil } from "lucide-react";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useUpdateLessonsMutation } from "~/redux/api/courseApi";

interface VideoFormProps {
  lessonId: string;
  courseid: string;
  video?: string | null;
}

export default function VideoForm({
  lessonId,
  courseid,
  video,
}: VideoFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(!video);
  const [videoUrl, setVideoUrl] = useState<string>(video || "");
  const [updateLesson, { isLoading }] = useUpdateLessonsMutation();

  const handleSave = async () => {
    if (!videoUrl.trim()) {
      toast.error("Please enter a valid video URL.");
      return;
    }

    try {
      await updateLesson({
        courseId: courseid,
        lessonId: lessonId,
        video: videoUrl,
      }).unwrap();

      toast.success("Video updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update video.");
      console.error("Video update error:", error);
    }
  };

  const getYouTubeEmbedUrl = (url: string): string | null => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
    );
    if (!match) return null;

    const videoId = match[1];
    return `https://www.youtube.com/embed/${videoId}?rel=0&controls=1&modestbranding=1`;
  };

  const embedUrl = useMemo(() => getYouTubeEmbedUrl(videoUrl), [videoUrl]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Video</h2>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
          >
            Edit
            <Pencil className="ml-2" size={16} />
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Enter YouTube video URL"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <div className="flex gap-4">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                setVideoUrl(video || "");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : embedUrl ? (
        <div className="aspect-video w-full">
          <iframe
            key={embedUrl}
            src={embedUrl}
            className="w-full h-full rounded-md border"
            title="Video Preview"
            allowFullScreen
          />
        </div>
      ) : (
        <p className="text-sm text-gray-500">No video added yet.</p>
      )}
    </div>
  );
}

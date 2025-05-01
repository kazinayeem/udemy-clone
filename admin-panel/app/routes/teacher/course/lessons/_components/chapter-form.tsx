import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import {
  useGetChaptersQuery,
  useCreateChapterMutation,
  useUpdateLessonsMutation,
} from "~/redux/api/courseApi";

interface Chapter {
  id: string;
  title: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

interface ChapterFormProps {
  chapterId: string;
  courseId: string;
  lessonId: string;
}

export default function ChapterForm({
  chapterId,
  courseId,
  lessonId,
}: ChapterFormProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<string>("");
  const [newChapterTitle, setNewChapterTitle] = useState<string>("");

  const {
    data: chapters = [],
    isLoading: loadingChapters,
    refetch,
  } = useGetChaptersQuery(courseId);
  const [createChapter] = useCreateChapterMutation();
  const [updateLessons, { isLoading }] = useUpdateLessonsMutation();

  
  useEffect(() => {
    if (!selectedChapterId && chapterId && chapters.length > 0) {
      const exists: Chapter | undefined = chapters.find(
        (ch: Chapter) => ch.id === chapterId
      );
      console.log("exists", exists);

      if (exists) {
        setSelectedChapterId(chapterId);
      }
    }
  }, [chapters, chapterId, selectedChapterId]);

  const handleSaveChapterSelection = async (chapterId: string) => {
    try {
      await updateLessons({
        lessonId,
        courseId,
        chapterId,
      }).unwrap();
      toast.success("Chapter updated for lesson!");
    } catch (error) {
      toast.error("Failed to update lesson's chapter.");
      console.error(error);
    }
  };

  const handleCreateChapter = async () => {
    if (!newChapterTitle.trim()) return;

    try {
      const newChapter = await createChapter({
        courseId,
        title: newChapterTitle.trim(),
      }).unwrap();

      toast.success("Chapter created!");
      setNewChapterTitle("");
      await refetch();
      setSelectedChapterId(newChapter.id);
      await handleSaveChapterSelection(newChapter.id);
    } catch (error) {
      toast.error("Failed to create chapter.");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg space-y-4">
      <div className="space-y-2">
        <label className="block font-medium">Select Chapter</label>
        <Select
          value={selectedChapterId}
          onValueChange={(val) => {
            setSelectedChapterId(val);
            handleSaveChapterSelection(val);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a chapter" />
          </SelectTrigger>
          <SelectContent>
            {chapters.map((chapter: Chapter) => (
              <SelectItem key={chapter.id} value={chapter.id}>
                {chapter.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          value={newChapterTitle}
          onChange={(e) => setNewChapterTitle(e.target.value)}
          placeholder="New chapter name"
        />
        <Button onClick={handleCreateChapter}>
          Add Chapter
          <Plus className="ml-1" size={16} />
        </Button>
      </div>

      {(isLoading || loadingChapters) && (
        <p className="text-sm text-gray-500">Saving or loading...</p>
      )}
    </div>
  );
}

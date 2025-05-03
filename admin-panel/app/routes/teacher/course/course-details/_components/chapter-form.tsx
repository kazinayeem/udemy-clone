import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaPen,
  FaPlus,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  useAddLessonMutation,
  useCreateChapterMutation,
} from "~/redux/api/courseApi";

interface Lesson {
  id: string;
  title: string;
  description: string | null;
  isFree: boolean;
  isPublished: boolean;
  video: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  chapterId: string;
}

interface Chapter {
  id: string;
  title: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  lessons: Lesson[];
}

interface ChapterProps {
  chapters: Chapter[];
  courseId: string;
}

const ChapterForm: React.FC<ChapterProps> = ({ chapters, courseId }) => {
  const [newChapter, setNewChapter] = useState<string>("");
  const [newLesson, setNewLesson] = useState<Lesson>({
    id: "",
    title: "",
    description: null,
    isFree: false,
    isPublished: false,
    video: "",
    courseId: courseId,
    createdAt: "",
    updatedAt: "",
    chapterId: "",
  });

  const [createChapter] = useCreateChapterMutation();
  const [addLesson] = useAddLessonMutation();
  const navigate = useNavigate();

  const handleEdit = (lessonId: string) => {
    navigate(`/teacher/course/course-details/${courseId}/lessons/${lessonId}`);
  };

  const handleAddChapter = async () => {
    if (newChapter) {
      try {
        await createChapter({
          courseId,
          title: newChapter,
        }).unwrap();
        setNewChapter("");
        toast.success("Chapter created!");
      } catch (error) {
        toast.error("Failed to create chapter");
      }
    }
  };

  const handleAddLesson = async (chapterId: string) => {
    if (newLesson.title) {
      try {
        await addLesson({
          courseId,
          chapterId,
          title: newLesson.title,
        });
        toast.success("Lesson added!");
        setNewLesson({
          ...newLesson,
          title: "",
          chapterId: "", 
        });
      } catch (error) {
        toast.error("Failed to add lesson");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 container mx-auto p-6 bg-white shadow-lg rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Chapters</h3>
        <Button
          variant="outline"
          size="lg"
          onClick={handleAddChapter}
          className="text-green-500 hover:text-green-700 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Chapter
        </Button>
      </div>
      <div className="mb-8">
        <Input
          type="text"
          value={newChapter}
          onChange={(e) => setNewChapter(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full mb-4"
          placeholder="Enter new chapter title"
        />
      </div>
      {chapters.map((chapter) => (
        <div key={chapter.id} className="mb-10">
          <h3 className="text-xl font-bold text-gray-700">
            {chapter.title}{" "}
            <span className="text-sm text-gray-500">
              - Total Lessons: {chapter.lessons.length}
            </span>
          </h3>

          <div className="flex flex-col gap-4 mt-6 ml-8">
            {chapter.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex justify-between items-center p-6 border-b border-gray-300 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="text-md font-semibold text-gray-800">
                    {lesson.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <span className="flex items-center">
                      {lesson.isFree ? (
                        <FaLock className="text-green-500 mr-1" />
                      ) : (
                        <FaTimesCircle className="text-red-500 mr-1" />
                      )}
                      {lesson.isFree ? "Free" : "Paid"}
                    </span>
                    <span className="flex items-center">
                      {lesson.isPublished ? (
                        <FaCheckCircle className="text-blue-500 mr-1" />
                      ) : (
                        <FaTimesCircle className="text-red-500 mr-1" />
                      )}
                      {lesson.isPublished ? "Published" : "Unpublished"}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(lesson.id)}
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <FaPen />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setNewLesson({ ...newLesson, chapterId: chapter.id })
              }
              className="mt-6 text-orange-500 hover:text-orange-700 flex items-center"
            >
              <FaPlus className="mr-2" />
              Add Lesson
            </Button>
            {newLesson && newLesson.chapterId === chapter.id && (
              <div className="mt-6">
                <Input
                  type="text"
                  value={newLesson.title || ""}
                  onChange={(e) =>
                    setNewLesson({ ...newLesson, title: e.target.value })
                  }
                  className="p-3 border border-gray-300 rounded-md w-full mb-4"
                  placeholder="Enter new lesson title"
                />

                <Button
                  onClick={() => handleAddLesson(chapter.id)}
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md"
                >
                  Save Lesson
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChapterForm;

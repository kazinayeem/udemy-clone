import { Request, Response } from "express";
import { course, lesson, chapter, fQA } from "../config/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "daq7v0wmf",
  api_key: "155683868831529",
  api_secret: "5NMrAe560Tw2DtYHdTgq1arigkA",
});
export const addCourse = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user?.id;

  try {
    const courseResponse = await course.create({
      data: {
        ...req.body,
        userId: userId,
      },
    });

    res.status(201).json(courseResponse);
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createFeq = async (req: Request, res: Response): Promise<void> => {
  try {
    const { question, answer } = req.body;
    const { courseId } = req.params;

    if (!question || !answer || !courseId) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const courseExists = await course.findUnique({
      where: { id: courseId },
    });

    if (!courseExists) {
      res.status(404).json({ success: false, message: "Course not found" });
      return;
    }

    const newFAQ = await fQA.create({
      data: {
        question,
        answer,
        courseId,
      },
    });

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: newFAQ,
    });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const updateFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const { faqId } = req.params;
    const { question, answer } = req.body;

    const existingFaq = await fQA.findUnique({
      where: { id: faqId },
    });

    if (!existingFaq) {
      res.status(404).json({ success: false, message: "FAQ not found" });
      return;
    }

    const updatedFaq = await fQA.update({
      where: { id: faqId },
      data: {
        question,
        answer,
      },
    });

    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      data: updatedFaq,
    });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const deleteFaq = async (req: Request, res: Response): Promise<void> => {
  try {
    const { faqId } = req.params;

    const existingFaq = await fQA.findUnique({
      where: { id: faqId },
    });

    if (!existingFaq) {
      res.status(404).json({ success: false, message: "FAQ not found" });
      return;
    }

    await fQA.delete({
      where: { id: faqId },
    });

    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllFAQs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courseId = req.params.courseId as string;
    if (!courseId) {
      res.status(400).json({ message: "not found" });
      return;
    }

    const faqs = await fQA.findMany({
      where: { courseId },
      orderBy: { createdAt: "asc" },
    });

    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const GetCoursebyId = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const courseResponse = await course.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        user: true,
        lessons: true,
        Chapter: {
          orderBy: { createdAt: "asc" },
          include: {
            lessons: {
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    });

    if (!courseResponse) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    res.status(200).json(courseResponse);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const Getchapter = async (
  req: Request<{ courseId: string }>,
  res: Response
): Promise<void> => {
  const { courseId } = req.params;

  try {
    const chapters = await chapter.findMany({
      where: {
        courseId: courseId,
      },
    });

    res.status(200).json(chapters);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const addChapter = async (
  req: Request<{ courseId: string }>,
  res: Response
): Promise<void> => {
  const { courseId } = req.params;

  try {
    const chapterResponse = await chapter.create({
      data: {
        ...req.body,
        courseId: courseId,
      },
    });

    res.status(201).json(chapterResponse);
  } catch (error) {
    console.error("Error adding chapter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateChapter = async (
  req: Request<{ courseId: string; chapterId: string }>,
  res: Response
): Promise<void> => {
  const { courseId, chapterId } = req.params;

  try {
    const chapterResponse = await lesson.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        ...req.body,
      },
    });

    res.status(200).json(chapterResponse);
  } catch (error) {
    console.error("Error updating chapter:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const addLesson = async (
  req: Request<{ courseId: string }>,
  res: Response
): Promise<void> => {
  const { courseId } = req.params;

  try {
    const lessonResponse = await lesson.create({
      data: {
        ...req.body,
        courseId: courseId,
      },
    });

    res.status(201).json(lessonResponse);
  } catch (error) {
    console.error("Error adding lesson:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLessonByCourseId = async (
  req: Request<{ courseId: string; lessonId: string }>,
  res: Response
): Promise<void> => {
  const { courseId, lessonId } = req.params;

  try {
    const lessons = await lesson.findFirst({
      where: {
        courseId: courseId,
        id: lessonId,
      },
    });

    res.status(200).json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateLessons = async (
  req: Request<{ courseId: string; lessonId: string }>,
  res: Response
): Promise<void> => {
  const { courseId, lessonId } = req.params;

  try {
    const lessons = await lesson.update({
      where: {
        id: lessonId,
        courseId: courseId,
      },
      data: {
        ...req.body,
      },
    });

    res.status(200).json(lessons);
  } catch (error) {
    console.error("Error updating lessons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateCourse = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const courseResponse = await course.update({
      where: {
        id,
        userId: userId,
      },
      data: {
        ...req.body,
        userId: userId,
      },
    });

    res.status(200).json(courseResponse);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

function extractPublicId(secureUrl: string) {
  const url = new URL(secureUrl);
  const parts = url.pathname.split("/");
  const versionIndex = parts.findIndex((p) => /^v\d+$/i.test(p));
  const publicIdParts = parts.slice(versionIndex + 1);
  const lastPart = publicIdParts[publicIdParts.length - 1];
  publicIdParts[publicIdParts.length - 1] = lastPart.split(".")[0];
  return publicIdParts.join("/");
}
export const uploadImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.files || !req.files.image) {
      res.status(400).json({ message: "No image file uploaded." });
      return;
    }

    const imageFile = req.files.image as any;
    const secureUrl = req.body?.secure_url || null;
    if (secureUrl) {
      try {
        const publicId = extractPublicId(secureUrl);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
          console.log("Previous image deleted:", publicId);
        } else {
          console.warn("No valid public ID extracted from URL:", secureUrl);
        }
      } catch (deleteErr) {
        console.warn("Failed to delete previous image:", deleteErr);
      }
    }
    const result = await cloudinary.uploader.upload(
      imageFile.tempFilePath || imageFile.tempFilePath,
      {
        folder: "lwm",
      }
    );
    if (!result || !result.secure_url) {
      throw new Error("Image upload failed: Missing secure_url");
    }
    res.status(200).json({
      url: result.secure_url,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    res
      .status(500)
      .json({ message: "Image upload failed.", error: errorMessage });
  }
};

export const getCourseByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await course.findMany({
      where: {
        userId: req.user?.id,
      },
      include: {
        category: true,
        user: true,
      },
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

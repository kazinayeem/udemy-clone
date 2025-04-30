import e, { Request, Response } from "express";
import { course, lesson } from "../config/db";

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

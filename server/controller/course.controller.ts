import { Request, Response } from "express";
import { course } from "../config/db";

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

import type { Request, Response } from "express";
import { course, review } from "../config/db";

export const createReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId, comment, rating } = req.body;
  const userId = req.user?.id;
  try {
    const findCourse = await course.findFirst({ where: { id: courseId } });
    if (!findCourse) {
      res.status(400).json({ message: "Course Not Found" });
      return;
    }
    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const existingReview = await review.findFirst({
      where: {
        courseId: courseId,
        userId: userId,
      },
    });

    if (existingReview) {
      res
        .status(400)
        .json({ message: "You have already reviewed this course" });
      return;
    }

    const response = await review.create({
      data: {
        courseId,
        comment,
        rating,
        userId,
        approved: false,
      },
    });

    res.status(201).json({
      message: "Review submitted successfully",
      review: response,
    });
  } catch (error) {
    console.error(error); // helpful for debugging
    res.status(500).json({ message: "Server error" });
  }
};

export const updateReviewApproval = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { approved } = req.body;

  try {
    const updatedReview = await review.update({
      where: { id },
      data: { approved },
    });

    res.status(200).json({ message: "Review updated", review: updatedReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllReviewsForUser = async (req: Request, res: Response) => {
  try {
    const reviews = await review.findMany({
      where: { approved: true },
      include: {
        course: {
          select: {
            title: true,
          },
        },
        user: { select: { name: true, image: true } },
      },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await review.findMany({
      include: {
        course: {
          select: {
            title: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getReviewsByCourseId = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    const reviews = await review.findMany({
      where: { courseId },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getReviewsByUserId = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  try {
    const reviews = await review.findMany({
      where: { userId },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getReviewById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const coursereview = await review.findUnique({
      where: { id },
    });

    if (!review) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.status(200).json(coursereview);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

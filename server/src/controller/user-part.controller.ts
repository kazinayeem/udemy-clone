import type { Request, Response } from "express";
import { category, course } from "../config/db";
import { Prisma } from "../../generated/prisma";

export const getAllCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const search = (req.query.search as string)?.trim() || "";

    // Filter for title search
    const searchFilter: Prisma.CourseWhereInput = search
      ? {
          title: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {};

    const commonWhere: Prisma.CourseWhereInput = {
      isPublished: true,
      approval: true,
      ...searchFilter,
    };

    const [courses, total] = await Promise.all([
      course.findMany({
        orderBy : {createdAt : "desc"},
        where: commonWhere,
        select: {
          id: true,
          title: true,
          category: true,
          image: true,
          price: true,
          reviews: true,
          duration: true,
          user: {
            select: {
              name: true,
            },
          },
        },
        skip,
        take: limit,
      }),
      course.count({
        where: commonWhere,
      }),
    ]);

    res.status(200).json({
      success: true,
      data: courses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const getCourseDetailsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const courseData = await course.findUnique({
      where: { id },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        reviews: true,
        fqa: true,
        Chapter: {
          orderBy: { createdAt: "asc" },
          include: {
            lessons: {
              orderBy : {createdAt : "asc"},
              where: {
                isPublished: true,
              },
            },
          },
        },
        enrollments: true,
      },
    });

    if (!courseData) {
      res.status(404).json({
        success: false,
        message: "Course not found.",
      });
      return;
    }

    const chapters = courseData.Chapter.map((chapter) => {
      const lessons =
        courseData.isPublished && courseData.approval
          ? chapter.lessons.map((lesson) => ({
              id: lesson.id,
              title: lesson.title,
              description: lesson.description,
              isFree: lesson.isFree,
              isPublished: lesson.isPublished,
              video: lesson.isFree ? lesson.video : null,
            }))
          : [];

      return {
        id: chapter.id,
        title: chapter.title,
        lessons,
      };
    });

    const result = {
      id: courseData.id,
      title: courseData.title,
      description: courseData.description,
      image: courseData.image,
      price: courseData.price,
      duration: courseData.duration,
      isPublished: courseData.isPublished,
      approval: courseData.approval,
      level: courseData.level,
      language: courseData.language,
      category: courseData.category,
      instructor: courseData.user,
      reviews: courseData.reviews,
      fqa: courseData.fqa,
      totalEnrollments: courseData.enrollments.length,
      chapters,
      createdAt: courseData.createdAt,
    };

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const getAllCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await category.findMany({
      include: {
        courses: {
          where: {
            approval: true,
            isPublished: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
export const getCoursesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const categoryName = req.params.name;

  try {
    const categoryData = await category.findFirst({
      where: { name: categoryName },
      include: {
        courses: {
          where: {
            isPublished: true,
            approval: true,
          },
        },
      },
    });

    if (!categoryData) {
      res.status(404).json({
        success: false,
        message: `No category found with name '${categoryName}'`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      category: categoryData.name,
      totalCourses: categoryData.courses.length,
      data: categoryData.courses,
    });
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

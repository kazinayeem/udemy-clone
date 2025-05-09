"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesByCategory = exports.getAllCategory = exports.getCourseDetailsById = exports.getAllCourse = void 0;
const db_1 = require("../config/db");
const getAllCourse = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = req.query.search?.trim() || "";
        // Filter for title search
        const searchFilter = search
            ? {
                title: {
                    contains: search,
                    mode: "insensitive",
                },
            }
            : {};
        const commonWhere = {
            isPublished: true,
            approval: true,
            ...searchFilter,
        };
        const [courses, total] = await Promise.all([
            db_1.course.findMany({
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
            db_1.course.count({
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
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};
exports.getAllCourse = getAllCourse;
const getCourseDetailsById = async (req, res) => {
    const { id } = req.params;
    try {
        const courseData = await db_1.course.findUnique({
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
                    include: {
                        lessons: {
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
            const lessons = courseData.isPublished && courseData.approval
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
    }
    catch (error) {
        console.error("Error fetching course details:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};
exports.getCourseDetailsById = getCourseDetailsById;
const getAllCategory = async (req, res) => {
    try {
        const categories = await db_1.category.findMany({
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
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};
exports.getAllCategory = getAllCategory;
const getCoursesByCategory = async (req, res) => {
    const categoryName = req.params.name;
    try {
        const categoryData = await db_1.category.findFirst({
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
    }
    catch (error) {
        console.error("Error fetching courses by category:", error);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};
exports.getCoursesByCategory = getCoursesByCategory;

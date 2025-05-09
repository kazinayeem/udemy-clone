"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseByUserId = exports.uploadImage = exports.updateCourse = exports.updateLessons = exports.getLessonByCourseId = exports.addLesson = exports.updateChapter = exports.addChapter = exports.Getchapter = exports.GetCoursebyId = exports.getAllFAQs = exports.deleteFaq = exports.updateFaq = exports.createFeq = exports.addCourse = void 0;
const db_1 = require("../config/db");
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: "daq7v0wmf",
    api_key: "155683868831529",
    api_secret: "5NMrAe560Tw2DtYHdTgq1arigkA",
});
const addCourse = async (req, res) => {
    const userId = req.user?.id;
    try {
        const courseResponse = await db_1.course.create({
            data: {
                ...req.body,
                userId: userId,
            },
        });
        res.status(201).json(courseResponse);
    }
    catch (error) {
        console.error("Error adding course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.addCourse = addCourse;
const createFeq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const { courseId } = req.params;
        if (!question || !answer || !courseId) {
            res
                .status(400)
                .json({ success: false, message: "All fields are required" });
            return;
        }
        const courseExists = await db_1.course.findUnique({
            where: { id: courseId },
        });
        if (!courseExists) {
            res.status(404).json({ success: false, message: "Course not found" });
            return;
        }
        const newFAQ = await db_1.fQA.create({
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
    }
    catch (error) {
        console.error("Error creating FAQ:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.createFeq = createFeq;
const updateFaq = async (req, res) => {
    try {
        const { faqId } = req.params;
        const { question, answer } = req.body;
        const existingFaq = await db_1.fQA.findUnique({
            where: { id: faqId },
        });
        if (!existingFaq) {
            res.status(404).json({ success: false, message: "FAQ not found" });
            return;
        }
        const updatedFaq = await db_1.fQA.update({
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
    }
    catch (error) {
        console.error("Error updating FAQ:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.updateFaq = updateFaq;
const deleteFaq = async (req, res) => {
    try {
        const { faqId } = req.params;
        const existingFaq = await db_1.fQA.findUnique({
            where: { id: faqId },
        });
        if (!existingFaq) {
            res.status(404).json({ success: false, message: "FAQ not found" });
            return;
        }
        await db_1.fQA.delete({
            where: { id: faqId },
        });
        res.status(200).json({
            success: true,
            message: "FAQ deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting FAQ:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.deleteFaq = deleteFaq;
const getAllFAQs = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        if (!courseId) {
            res.status(400).json({ message: "not found" });
            return;
        }
        const faqs = await db_1.fQA.findMany({
            where: { courseId },
            orderBy: { createdAt: "desc" },
        });
        res.status(200).json({
            success: true,
            count: faqs.length,
            data: faqs,
        });
    }
    catch (error) {
        console.error("Error fetching FAQs:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.getAllFAQs = getAllFAQs;
const GetCoursebyId = async (req, res) => {
    const { id } = req.params;
    try {
        const courseResponse = await db_1.course.findUnique({
            where: {
                id,
            },
            include: {
                category: true,
                user: true,
                lessons: true,
                Chapter: {
                    include: {
                        lessons: true,
                    },
                },
            },
        });
        if (!courseResponse) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        res.status(200).json(courseResponse);
    }
    catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.GetCoursebyId = GetCoursebyId;
const Getchapter = async (req, res) => {
    const { courseId } = req.params;
    try {
        const chapters = await db_1.chapter.findMany({
            where: {
                courseId: courseId,
            },
        });
        res.status(200).json(chapters);
    }
    catch (error) {
        console.error("Error fetching chapters:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.Getchapter = Getchapter;
const addChapter = async (req, res) => {
    const { courseId } = req.params;
    try {
        const chapterResponse = await db_1.chapter.create({
            data: {
                ...req.body,
                courseId: courseId,
            },
        });
        res.status(201).json(chapterResponse);
    }
    catch (error) {
        console.error("Error adding chapter:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.addChapter = addChapter;
const updateChapter = async (req, res) => {
    const { courseId, chapterId } = req.params;
    try {
        const chapterResponse = await db_1.lesson.update({
            where: {
                id: chapterId,
                courseId: courseId,
            },
            data: {
                ...req.body,
            },
        });
        res.status(200).json(chapterResponse);
    }
    catch (error) {
        console.error("Error updating chapter:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateChapter = updateChapter;
const addLesson = async (req, res) => {
    const { courseId } = req.params;
    try {
        const lessonResponse = await db_1.lesson.create({
            data: {
                ...req.body,
                courseId: courseId,
            },
        });
        res.status(201).json(lessonResponse);
    }
    catch (error) {
        console.error("Error adding lesson:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.addLesson = addLesson;
const getLessonByCourseId = async (req, res) => {
    const { courseId, lessonId } = req.params;
    try {
        const lessons = await db_1.lesson.findFirst({
            where: {
                courseId: courseId,
                id: lessonId,
            },
        });
        res.status(200).json(lessons);
    }
    catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getLessonByCourseId = getLessonByCourseId;
const updateLessons = async (req, res) => {
    const { courseId, lessonId } = req.params;
    try {
        const lessons = await db_1.lesson.update({
            where: {
                id: lessonId,
                courseId: courseId,
            },
            data: {
                ...req.body,
            },
        });
        res.status(200).json(lessons);
    }
    catch (error) {
        console.error("Error updating lessons:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateLessons = updateLessons;
const updateCourse = async (req, res) => {
    const { id } = req.params;
    const userId = req.user?.id;
    try {
        const courseResponse = await db_1.course.update({
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
    }
    catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateCourse = updateCourse;
function extractPublicId(secureUrl) {
    const url = new URL(secureUrl);
    const parts = url.pathname.split("/");
    const versionIndex = parts.findIndex((p) => /^v\d+$/i.test(p));
    const publicIdParts = parts.slice(versionIndex + 1);
    const lastPart = publicIdParts[publicIdParts.length - 1];
    publicIdParts[publicIdParts.length - 1] = lastPart.split(".")[0];
    return publicIdParts.join("/");
}
const uploadImage = async (req, res) => {
    try {
        if (!req.files || !req.files.image) {
            res.status(400).json({ message: "No image file uploaded." });
            return;
        }
        const imageFile = req.files.image;
        const secureUrl = req.body?.secure_url || null;
        if (secureUrl) {
            try {
                const publicId = extractPublicId(secureUrl);
                if (publicId) {
                    await cloudinary_1.v2.uploader.destroy(publicId);
                    console.log("Previous image deleted:", publicId);
                }
                else {
                    console.warn("No valid public ID extracted from URL:", secureUrl);
                }
            }
            catch (deleteErr) {
                console.warn("Failed to delete previous image:", deleteErr);
            }
        }
        const result = await cloudinary_1.v2.uploader.upload(imageFile.tempFilePath || imageFile.tempFilePath, {
            folder: "lwm",
        });
        if (!result || !result.secure_url) {
            throw new Error("Image upload failed: Missing secure_url");
        }
        res.status(200).json({
            url: result.secure_url,
        });
    }
    catch (error) {
        console.error("Image upload error:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        res
            .status(500)
            .json({ message: "Image upload failed.", error: errorMessage });
    }
};
exports.uploadImage = uploadImage;
const getCourseByUserId = async (req, res) => {
    try {
        const courses = await db_1.course.findMany({
            where: {
                userId: req.user?.id,
            },
            include: {
                category: true,
                user: true,
            },
        });
        res.status(200).json(courses);
    }
    catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getCourseByUserId = getCourseByUserId;

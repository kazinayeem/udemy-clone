"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseByUserId = exports.updateCourse = exports.updateLessons = exports.getLessonByCourseId = exports.addLesson = exports.updateChapter = exports.addChapter = exports.Getchapter = exports.GetCoursebyId = exports.addCourse = void 0;
const db_1 = require("../config/db");
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
                Chapter: true,
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

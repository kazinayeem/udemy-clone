"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviewById = exports.getReviewsByUserId = exports.getReviewsByCourseId = exports.getAllReviews = exports.getAllReviewsForUser = exports.updateReviewApproval = exports.createReview = void 0;
const db_1 = require("../config/db");
const createReview = async (req, res) => {
    const { courseId, comment, rating } = req.body;
    const userId = req.user?.id;
    try {
        const findCourse = await db_1.course.findFirst({ where: { id: courseId } });
        if (!findCourse) {
            res.status(400).json({ message: "Course Not Found" });
            return;
        }
        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const existingReview = await db_1.review.findFirst({
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
        const response = await db_1.review.create({
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
    }
    catch (error) {
        console.error(error); // helpful for debugging
        res.status(500).json({ message: "Server error" });
    }
};
exports.createReview = createReview;
const updateReviewApproval = async (req, res) => {
    const { id } = req.params;
    const { approved } = req.body;
    try {
        const updatedReview = await db_1.review.update({
            where: { id },
            data: { approved },
        });
        res.status(200).json({ message: "Review updated", review: updatedReview });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.updateReviewApproval = updateReviewApproval;
const getAllReviewsForUser = async (req, res) => {
    try {
        const reviews = await db_1.review.findMany({
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
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getAllReviewsForUser = getAllReviewsForUser;
const getAllReviews = async (req, res) => {
    try {
        const reviews = await db_1.review.findMany({
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
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getAllReviews = getAllReviews;
const getReviewsByCourseId = async (req, res) => {
    const { courseId } = req.params;
    try {
        const reviews = await db_1.review.findMany({
            where: { courseId },
        });
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getReviewsByCourseId = getReviewsByCourseId;
const getReviewsByUserId = async (req, res) => {
    const userId = req.user?.id;
    try {
        const reviews = await db_1.review.findMany({
            where: { userId },
        });
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getReviewsByUserId = getReviewsByUserId;
const getReviewById = async (req, res) => {
    const { id } = req.params;
    try {
        const coursereview = await db_1.review.findUnique({
            where: { id },
        });
        if (!db_1.review) {
            res.status(404).json({ message: "Review not found" });
            return;
        }
        res.status(200).json(coursereview);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.getReviewById = getReviewById;

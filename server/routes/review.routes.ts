import express from "express";
import { checkLogin } from "../middleware/checkLogin";
import {
  createReview,
  updateReviewApproval,
  getAllReviews,
  getReviewsByCourseId,
  getReviewsByUserId,
  getAllReviewsForUser,
  getReviewById,
} from "../controller/review.controller";

const router = express.Router();

router.post("/", checkLogin, createReview);
router.get("/user-review", getAllReviewsForUser);
router.put("/:id/approve", updateReviewApproval);
router.get("/", getAllReviews);
router.get("/course/:courseId", getReviewsByCourseId);
router.get("/user/:userId", getReviewsByUserId);
router.get("/:id", getReviewById);

export default router;

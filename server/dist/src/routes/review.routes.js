"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkLogin_1 = require("../middleware/checkLogin");
const review_controller_1 = require("../controller/review.controller");
const router = express_1.default.Router();
router.post("/", checkLogin_1.checkLogin, review_controller_1.createReview);
router.get("/user-review", review_controller_1.getAllReviewsForUser);
router.put("/:id/approve", review_controller_1.updateReviewApproval);
router.get("/", review_controller_1.getAllReviews);
router.get("/course/:courseId", review_controller_1.getReviewsByCourseId);
router.get("/user/:userId", review_controller_1.getReviewsByUserId);
router.get("/:id", review_controller_1.getReviewById);
exports.default = router;

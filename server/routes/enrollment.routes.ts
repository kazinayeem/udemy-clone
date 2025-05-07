import express from "express";
import {
  cancel,
  checkEnrollmentStatus,
  courseEnrollment,
  failed,
  getMyCourseById,
  MyEnrollmentCourse,
  success,
} from "../controller/enrollment.controller";
import { checkLogin } from "../middleware/checkLogin";

const router = express.Router();

router.post("/", checkLogin, courseEnrollment);
router.post("/success", success);
router.post("/fail", failed);
router.post("/cancel", cancel);
router.get("/check/:courseId", checkLogin, checkEnrollmentStatus);
router.get("/mycourse", checkLogin, MyEnrollmentCourse);
router.get("/mycourse/:courseId", checkLogin, getMyCourseById);
export default router;

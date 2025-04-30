import express from "express";
import {
  addCourse,
  addLesson,
  GetCoursebyId,
  getCourseByUserId,
  getLessonByCourseId,
  updateCourse,
  updateLessons,
} from "../controller/course.controller";
import { checkLogin } from "../middleware/checkLogin";

const router = express.Router();

router.post("/course/add-course", checkLogin, addCourse);
router.get("/course/:id", checkLogin, GetCoursebyId);
router.put("/course/:id", checkLogin, updateCourse);
router.get("/course", checkLogin, getCourseByUserId);
// add lesson route
router.post("/course/:courseId/lessons", checkLogin, addLesson);
router.get(
  "/course/:courseId/lessons/:lessonId",
  checkLogin,
  getLessonByCourseId
);
// update lesson route
router.put("/course/:courseId/lessons/:lessonId", checkLogin, updateLessons);
export default router;

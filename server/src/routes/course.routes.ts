import express from "express";
import {
  addChapter,
  addCourse,
  addLesson,
  createFeq,
  deleteFaq,
  getAllFAQs,
  Getchapter,
  GetCoursebyId,
  getCourseByUserId,
  getLessonByCourseId,
  updateChapter,
  updateCourse,
  updateFaq,
  updateLessons,
  uploadImage,
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
router.post("/course/:courseId/chapters/", checkLogin, addChapter);
router.get("/course/:courseId/chapters", checkLogin, Getchapter);
router.put("/course/:courseId/chapters/:chapterId", checkLogin, updateChapter);
router.get("/course/:courseId/fqa", getAllFAQs);
router.post("/course/:courseId/fqa", createFeq);
router.put("/course/faq/:faqId", updateFaq);
router.delete("/course/faq/:faqId", deleteFaq);
router.put("/course/image/upload", uploadImage);
export default router;

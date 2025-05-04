"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("../controller/course.controller");
const checkLogin_1 = require("../middleware/checkLogin");
const router = express_1.default.Router();
router.post("/course/add-course", checkLogin_1.checkLogin, course_controller_1.addCourse);
router.get("/course/:id", checkLogin_1.checkLogin, course_controller_1.GetCoursebyId);
router.put("/course/:id", checkLogin_1.checkLogin, course_controller_1.updateCourse);
router.get("/course", checkLogin_1.checkLogin, course_controller_1.getCourseByUserId);
// add lesson route
router.post("/course/:courseId/lessons", checkLogin_1.checkLogin, course_controller_1.addLesson);
router.get("/course/:courseId/lessons/:lessonId", checkLogin_1.checkLogin, course_controller_1.getLessonByCourseId);
// update lesson route
router.put("/course/:courseId/lessons/:lessonId", checkLogin_1.checkLogin, course_controller_1.updateLessons);
router.post("/course/:courseId/chapters/", checkLogin_1.checkLogin, course_controller_1.addChapter);
router.get("/course/:courseId/chapters", checkLogin_1.checkLogin, course_controller_1.Getchapter);
router.put("/course/:courseId/chapters/:chapterId", checkLogin_1.checkLogin, course_controller_1.updateChapter);
router.get("/course/:courseId/fqa", course_controller_1.getAllFAQs);
router.post("/course/:courseId/fqa", course_controller_1.createFeq);
router.put("/course/faq/:faqId", course_controller_1.updateFaq);
router.delete("/course/faq/:faqId", course_controller_1.deleteFaq);
exports.default = router;

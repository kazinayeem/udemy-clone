import express from "express";
import { addCourse, GetCoursebyId } from "../controller/course.controller";
import { checkLogin } from "../middleware/checkLogin";

const router = express.Router();

router.post("/course/add-course", checkLogin, addCourse);
router.get("/course/:id", checkLogin, GetCoursebyId);

export default router;

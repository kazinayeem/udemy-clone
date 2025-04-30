import express from "express";
import {
  addCourse,
  GetCoursebyId,
  getCourseByUserId,
  updateCourse,
} from "../controller/course.controller";
import { checkLogin } from "../middleware/checkLogin";

const router = express.Router();

router.post("/course/add-course", checkLogin, addCourse);
router.get("/course/:id", checkLogin, GetCoursebyId);
router.put("/course/:id", checkLogin, updateCourse);
router.get("/course", checkLogin, getCourseByUserId);
export default router;

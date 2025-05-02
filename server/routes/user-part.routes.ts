import express from "express";

import {
  getAllCategory,
  getAllCourse,
  getCourseDetailsById,
  getCoursesByCategory,
} from "../controller/user-part.controller";

const router = express.Router();


router.get("/categories", getAllCategory);

router.get("/courses", getAllCourse);

router.get("/courses/category/:name", getCoursesByCategory);

router.get("/course/:id", getCourseDetailsById);

export default router;

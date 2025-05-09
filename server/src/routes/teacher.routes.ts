import express from "express";
import {
  bannedTecher,
  getAllStudents,
  getAllTeachers,
  getCourseEnrollments,
  getMonthlySales,
  getSalesReport,
  getStudentByEmail,
  getStudentById,
  getStudentCourses,
  getTeacherByEmail,
  getTeacherById,
  getTeacherCourses,
  getTeacherCoursesById,
  getTotalSales,
  totalCourses,
  unBannedTecher,
  courseApproved,
  courseUnApproved,
  getAllCourse,
} from "../controller/teacher.controller";
import { checkAdmin } from "../middleware/checkAdmin";
const router = express.Router();
router.get("/all-course", checkAdmin,getAllCourse);
router.put("/course/approved/:courseId", checkAdmin,courseApproved);
router.put("/course/unapproved/:courseId",checkAdmin, courseUnApproved);
router.get("/all-teachers", checkAdmin, getAllTeachers);
router.get("/all-students", checkAdmin, getAllStudents);
router.get("/teacher/:id", checkAdmin, getTeacherById);
router.get("/student/:studentId", checkAdmin, getStudentById);
router.get("/student/email/:email", checkAdmin, getStudentByEmail);
router.get("/teacher/email/:email", checkAdmin, getTeacherByEmail);
router.get("/teacher/:teacherId/courses", checkAdmin, getTeacherCourses);
router.get("/student/:studentId/courses", checkAdmin, getStudentCourses);
router.get(
  "/teacher/:teacherId/courses/:courseId",
  checkAdmin,
  getTeacherCoursesById
);
router.get("/sales-report", checkAdmin, getSalesReport);
router.put("/teacher/:teacherId/banned", checkAdmin, bannedTecher);
router.put("/teacher/:teacherId/unbanned", checkAdmin, unBannedTecher);
router.get("/total-courses", checkAdmin, totalCourses);
router.get("/monthly-sales", checkAdmin, getMonthlySales);
router.get("/total-sales", checkAdmin, getTotalSales);
router.get("/course-enrollments", checkAdmin, getCourseEnrollments);

export default router;

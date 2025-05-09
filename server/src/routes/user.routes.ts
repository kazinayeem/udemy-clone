import express from "express";
import {
  bannedUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserById,
  loginUser,
  registerUser,
  teacherCourse,
  unbannedUser,
  updateUser,
} from "../controller/user.controller";
import { authenticateUser } from "../middleware/checkActiveuser";
import { checkLogin } from "../middleware/checkLogin";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/register", registerUser);
router.post("/login", authenticateUser, loginUser);
router.get("/user/userid",checkLogin, getUserById);
router.get("/user", checkLogin, getUser);
router.put("/user/:id", checkLogin, updateUser);
router.delete("/user/:id", deleteUser);
router.put("/user/banned/:id", bannedUser);
router.put("/user/unbanned/:id", unbannedUser);
router.get("/user/courses/course", checkLogin,teacherCourse);
export default router;

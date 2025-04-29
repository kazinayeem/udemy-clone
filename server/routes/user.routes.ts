import express from "express";
import {
  getAllUsers,
  loginUser,
  registerUser,
  bannedUser,
  deleteUser,
  getUserById,
  unbannedUser,
  getUser,
  updateUser,
} from "../controller/user.controller";

const router = express.Router();

router.get("/users", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/:id", getUserById);
router.get("/user", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.put("/user/banned/:id", bannedUser);
router.put("/user/unbanned/:id", unbannedUser);

export default router;

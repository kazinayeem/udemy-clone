import express from "express";
import {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controller/category.controller";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;

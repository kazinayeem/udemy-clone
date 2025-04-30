import express from "express";
import { getAllCategories } from "../controller/category.controller";

const router = express.Router();

router.get("/", getAllCategories);

export default router;

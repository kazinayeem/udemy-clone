"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_part_controller_1 = require("../controller/user-part.controller");
const router = express_1.default.Router();
router.get("/categories", user_part_controller_1.getAllCategory);
router.get("/courses", user_part_controller_1.getAllCourse);
router.get("/courses/category/:name", user_part_controller_1.getCoursesByCategory);
router.get("/course/:id", user_part_controller_1.getCourseDetailsById);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const enrollment_controller_1 = require("../controller/enrollment.controller");
const checkLogin_1 = require("../middleware/checkLogin");
const router = express_1.default.Router();
router.post("/", checkLogin_1.checkLogin, enrollment_controller_1.courseEnrollment);
router.post("/success", enrollment_controller_1.success);
router.post("/fail", enrollment_controller_1.failed);
router.post("/cancel", enrollment_controller_1.cancel);
router.get("/check/:courseId", checkLogin_1.checkLogin, enrollment_controller_1.checkEnrollmentStatus);
router.get("/mycourse", checkLogin_1.checkLogin, enrollment_controller_1.MyEnrollmentCourse);
router.get("/mycourse/:courseId", checkLogin_1.checkLogin, enrollment_controller_1.getMyCourseById);
exports.default = router;

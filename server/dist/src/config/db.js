"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.review = exports.lesson = exports.fQA = exports.enrollment = exports.course = exports.category = exports.chapter = exports.attachment = exports.user = void 0;
const prisma_1 = require("../generated/prisma");
const db = new prisma_1.PrismaClient();
exports.user = db.user, exports.attachment = db.attachment, exports.chapter = db.chapter, exports.category = db.category, exports.course = db.course, exports.enrollment = db.enrollment, exports.fQA = db.fQA, exports.lesson = db.lesson, exports.review = db.review;
exports.default = db;

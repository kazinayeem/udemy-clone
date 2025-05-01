"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherCourse = exports.unbannedUser = exports.bannedUser = exports.getUserById = exports.deleteUser = exports.updateUser = exports.getUser = exports.loginUser = exports.registerUser = exports.getAllUsers = void 0;
const db_1 = require("../config/db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getAllUsers = async (req, res) => {
    try {
        const users = await db_1.user.findMany({
            include: {
                course: true,
                enrollment: true,
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllUsers = getAllUsers;
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await db_1.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newUser = await db_1.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await db_1.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            res.status(400).json({ message: "User not Found" });
        }
        if (!existingUser) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, existingUser.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET || "default", { expiresIn: "30day" });
        res.status(200).json({
            message: "Login successful",
            user: {
                id: existingUser.id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role,
                token,
            },
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.loginUser = loginUser;
const getUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        const userData = await db_1.user.findUnique({
            where: { id: userId.toString() },
            include: {
                course: true,
                enrollment: true,
                review: true,
            },
            omit: { password: true },
        });
        if (!userData) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(userData);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        const existingUser = await db_1.user.findUnique({
            where: { id: userId },
        });
        console.log("existingUser", existingUser);
        if (!existingUser) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const updatedUser = await db_1.user.update({
            where: { id: userId },
            data: {
                address: req.body.address,
                bio: req.body.bio,
                description: req.body.description,
                name: req.body.name,
                email: req.body.email,
                country: req.body.country,
                phone: req.body.phone,
            },
        });
        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
            },
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        const existingUser = await db_1.user.findUnique({
            where: { id: userId.toString() },
        });
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await db_1.user.delete({
            where: { id: userId.toString() },
        });
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteUser = deleteUser;
const getUserById = async (req, res) => {
    res.status(200).json({ message: "User by ID" });
};
exports.getUserById = getUserById;
const bannedUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        const existingUser = await db_1.user.findUnique({
            where: { id: userId.toString() },
        });
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await db_1.user.update({
            where: { id: userId.toString() },
            data: { isActive: false },
        });
        res.status(200).json({ message: "User banned successfully" });
    }
    catch (error) {
        console.error("Error banning user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.bannedUser = bannedUser;
const unbannedUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = parseInt(id, 10);
        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        const existingUser = await db_1.user.findUnique({
            where: { id: userId.toString() },
        });
        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await db_1.user.update({
            where: { id: userId.toString() },
            data: { isActive: false },
        });
        res.status(200).json({ message: "User unbanned successfully" });
    }
    catch (error) {
        console.error("Error unbanning user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.unbannedUser = unbannedUser;
const teacherCourse = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(400).json({ message: "User ID is required" });
            return;
        }
        const totalCourses = await db_1.course.count({
            where: { userId: userId },
        });
        const totalSellCount = await db_1.enrollment.count({
            where: {
                course: {
                    userId,
                },
            },
        });
        const totalSellAmount = await db_1.enrollment.findMany({
            where: {
                course: {
                    userId: userId,
                },
            },
            select: {
                course: {
                    select: {
                        price: true,
                    },
                },
            },
        });
        const uniqueStudents = await db_1.enrollment.findMany({
            where: {
                course: {
                    userId,
                },
            },
            select: {
                userId: true,
            },
            distinct: ["userId"],
        });
        const totalUniqueStudents = uniqueStudents.length;
        const totalAmount = totalSellAmount.reduce((sum, enrollment) => {
            return sum + (enrollment.course?.price || 0);
        }, 0);
        res.status(200).json({
            totalCourses,
            totalSellCount,
            totalAmount,
            uniqueStudents: totalUniqueStudents,
        });
    }
    catch (error) {
        console.error("Error fetching user courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.teacherCourse = teacherCourse;

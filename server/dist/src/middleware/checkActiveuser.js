"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const db_1 = require("../config/db");
const authenticateUser = async (req, res, next) => {
    const { email } = req.body;
    try {
        const isUser = await db_1.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                isActive: true,
            },
        });
        if (!isUser) {
            res.status(400).json({ message: "Unauthorized" });
        }
        if (isUser && !isUser.isActive) {
            res
                .status(400)
                .json({
                message: "Your Account Has been Banned please contact kazinayeem550@gmail.com",
            });
        }
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.authenticateUser = authenticateUser;

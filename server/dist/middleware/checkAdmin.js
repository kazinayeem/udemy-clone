"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const checkAdmin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader?.split(" ")[1];
    try {
        if (!token) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, "default");
        const isuser = await db_1.user.findUnique({
            where: { id: decoded.id },
        });
        if (!db_1.user) {
            res.status(401).json({ message: "User not found" });
        }
        if (db_1.user && isuser?.role !== "ADMIN") {
            res.status(403).json({ message: "Forbidden: Admins only" });
        }
        if (!isuser) {
            res.status(401).json({ message: "User not found" });
        }
        if (isuser) {
            req.user = {
                id: decoded.id,
                email: isuser.email,
                role: isuser.role,
                iat: decoded.iat,
                exp: decoded.exp,
            };
        }
        else {
            res.status(401).json({ message: "User not found" });
            return;
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.checkAdmin = checkAdmin;

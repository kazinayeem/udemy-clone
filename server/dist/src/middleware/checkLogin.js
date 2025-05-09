"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkLogin = (req, res, next) => {
    return new Promise((resolve, reject) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Unauthorized: No token provided" });
            return reject();
        }
        const token = authHeader?.split(" ")[1] || "";
        try {
            const decoded = jsonwebtoken_1.default.verify(token, "default");
            req.user = decoded;
            resolve();
            next();
        }
        catch (error) {
            res
                .status(401)
                .json({ message: "Unauthorized: Invalid or expired token" });
            reject();
        }
    });
};
exports.checkLogin = checkLogin;

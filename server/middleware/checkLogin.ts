// middleware/checkLogin.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedUser {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: DecodedUser;
  }
}

export const checkLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized: No token provided" });
      return reject();
    }

    const token = authHeader?.split(" ")[1] || "";

    try {
      const decoded = jwt.verify(token, "default") as DecodedUser;

      req.user = decoded;
      resolve();
      next();
    } catch (error) {
      res
        .status(401)
        .json({ message: "Unauthorized: Invalid or expired token" });
      reject();
    }
  });
};

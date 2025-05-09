// middleware/checkAdmin.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { user } from "../config/db";

interface JwtPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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

    const decoded = jwt.verify(token, "default") as unknown as JwtPayload;

    const isuser = await user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
    }

    if (user && isuser?.role !== "ADMIN") {
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
    } else {
      res.status(401).json({ message: "User not found" });
      return;
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

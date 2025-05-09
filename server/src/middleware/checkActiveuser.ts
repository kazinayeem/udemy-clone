// middleware/authMiddleware.ts
import { NextFunction, Request, Response } from "express";
import { user } from "../config/db";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;

  try {
    const isUser = await user.findUnique({
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
          message:
            "Your Account Has been Banned please contact kazinayeem550@gmail.com",
        });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

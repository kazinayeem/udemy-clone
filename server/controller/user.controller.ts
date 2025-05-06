import { Request, Response } from "express";
import { course, enrollment, user } from "../config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await user.findMany({
      include: {
        course: true,
        enrollment: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role,
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
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      res.status(400).json({ message: "User not Found" });
      return;
    }
    if (!existingUser) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }
    const token = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      (process.env.JWT_SECRET as string) || "default",
      { expiresIn: "30day" }
    );

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
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id as string;
    const userData = await user.findUnique({
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
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id as string;

    const existingUser = await user.findUnique({
      where: { id: userId },
    });
    console.log("existingUser", existingUser);

    if (!existingUser) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const updatedUser = await user.update({
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
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }
    const existingUser = await user.findUnique({
      where: { id: userId.toString() },
    });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await user.delete({
      where: { id: userId.toString() },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({ message: "User by ID" });
};
export const bannedUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }
    const existingUser = await user.findUnique({
      where: { id: userId.toString() },
    });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await user.update({
      where: { id: userId.toString() },
      data: { isActive: false },
    });
    res.status(200).json({ message: "User banned successfully" });
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const unbannedUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }
    const existingUser = await user.findUnique({
      where: { id: userId.toString() },
    });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    await user.update({
      where: { id: userId.toString() },
      data: { isActive: false },
    });
    res.status(200).json({ message: "User unbanned successfully" });
  } catch (error) {
    console.error("Error unbanning user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const teacherCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }
    const totalCourses = await course.count({
      where: { userId: userId },
    });
    const totalSellCount = await enrollment.count({
      where: {
        course: {
          userId,
        },
      },
    });

    const totalSellAmount = await enrollment.findMany({
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
    const uniqueStudents = await enrollment.findMany({
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
  } catch (error) {
    console.error("Error fetching user courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { Request, Response } from "express";
import { user } from "../config/db";
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
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await user.create({
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
    const { id } = req.params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }
    const userData = await user.findUnique({
      where: { id: userId.toString() },
      include: {
        course: true,
        enrollment: true,
      },
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
    const { id } = req.params;
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const existingUser = await user.findUnique({
      where: { id: userId.toString() },
    });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await user.update({
      where: { id: userId.toString() },
      data: {
        name,
        email,
        password: hashedPassword,
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
): Promise<void> => {};
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

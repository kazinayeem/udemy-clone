"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getAllCategories = void 0;
const db_1 = require("../config/db");
const getAllCategories = async (req, res) => {
    try {
        const categories = await db_1.category.findMany({
            include: {
                courses: true,
            },
        });
        res.status(200).json(categories);
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllCategories = getAllCategories;
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await db_1.category.create({
            data: {
                name,
            },
        });
        res.status(201).json(newCategory);
    }
    catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCategory = await db_1.category.update({
            where: {
                id,
            },
            data: {
                ...req.body,
            },
        });
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await db_1.category.delete({
            where: {
                id,
            },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteCategory = deleteCategory;

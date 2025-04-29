import { PrismaClient } from "../generated/prisma";

const db = new PrismaClient();

export const {
  user,
  attachment,
  teacher,
  category,
  course,
  courseItem,
  enrollment,
  fQA,
  lesson,
  review,
} = db;
export default db;

import { PrismaClient } from "../generated/prisma";

const db = new PrismaClient();

export const {
  user,
  attachment,
  chapter,
  category,
  course,
  enrollment,
  fQA,
  lesson,
  review,
} = db;
export default db;

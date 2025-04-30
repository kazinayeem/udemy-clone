/*
  Warnings:

  - You are about to drop the `Teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `teacherId` on the `Course` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Teacher_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN "address" TEXT;
ALTER TABLE "User" ADD COLUMN "bio" TEXT;
ALTER TABLE "User" ADD COLUMN "country" TEXT;
ALTER TABLE "User" ADD COLUMN "description" TEXT;
ALTER TABLE "User" ADD COLUMN "phone" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Teacher";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Course" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "price" REAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" TEXT,
    "courseItemId" TEXT,
    "level" TEXT,
    "language" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Course_courseItemId_fkey" FOREIGN KEY ("courseItemId") REFERENCES "CourseItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Course" ("categoryId", "courseItemId", "createdAt", "description", "duration", "id", "image", "isPublished", "language", "level", "price", "title", "updatedAt", "userId") SELECT "categoryId", "courseItemId", "createdAt", "description", "duration", "id", "image", "isPublished", "language", "level", "price", "title", "updatedAt", "userId" FROM "Course";
DROP TABLE "Course";
ALTER TABLE "new_Course" RENAME TO "Course";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

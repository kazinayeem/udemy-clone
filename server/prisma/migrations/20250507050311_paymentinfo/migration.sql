/*
  Warnings:

  - You are about to drop the `PaymentInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PaymentInfo" DROP CONSTRAINT "PaymentInfo_enrollementId_fkey";

-- DropForeignKey
ALTER TABLE "PaymentInfo" DROP CONSTRAINT "PaymentInfo_enrollmentId_fkey";

-- AlterTable
ALTER TABLE "Enrollment" ADD COLUMN     "PaymentId" TEXT,
ADD COLUMN     "paymentMethod" TEXT,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "PaymentInfo";

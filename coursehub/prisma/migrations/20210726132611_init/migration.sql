/*
  Warnings:

  - The `Overall_rating` column on the `teacher` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "student" ALTER COLUMN "wallet" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "teacher" ALTER COLUMN "wallet" SET DEFAULT 0,
DROP COLUMN "Overall_rating",
ADD COLUMN     "Overall_rating" INTEGER NOT NULL DEFAULT 0;

/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "student" ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "student.token_unique" ON "student"("token");

-- CreateIndex
CREATE UNIQUE INDEX "teacher.token_unique" ON "teacher"("token");

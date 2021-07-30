/*
  Warnings:

  - You are about to drop the column `studentCallId` on the `schedule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[student]` on the table `schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacher]` on the table `schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[day]` on the table `schedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[session]` on the table `schedule` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "schedule.studentCallId_unique";

-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "studentCallId";

-- CreateIndex
CREATE UNIQUE INDEX "schedule.student_unique" ON "schedule"("student");

-- CreateIndex
CREATE UNIQUE INDEX "schedule.teacher_unique" ON "schedule"("teacher");

-- CreateIndex
CREATE UNIQUE INDEX "schedule.day_unique" ON "schedule"("day");

-- CreateIndex
CREATE UNIQUE INDEX "schedule.session_unique" ON "schedule"("session");

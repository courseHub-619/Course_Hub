/*
  Warnings:

  - A unique constraint covering the columns `[teacher_id]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sessions.teacher_id_unique" ON "sessions"("teacher_id");

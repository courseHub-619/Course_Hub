/*
  Warnings:

  - A unique constraint covering the columns `[teacher_id]` on the table `weekDay` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "weekDay.teacher_id_unique" ON "weekDay"("teacher_id");

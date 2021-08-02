/*
  Warnings:

  - You are about to drop the `DM` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DM" DROP CONSTRAINT "DM_student_fkey";

-- DropForeignKey
ALTER TABLE "DM" DROP CONSTRAINT "DM_teacher_fkey";

-- DropTable
DROP TABLE "DM";

-- CreateTable
CREATE TABLE "feedback" (
    "feedback_id" SERIAL NOT NULL,
    "student" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    PRIMARY KEY ("feedback_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "feedback.student_unique" ON "feedback"("student");

-- AddForeignKey
ALTER TABLE "feedback" ADD FOREIGN KEY ("student") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

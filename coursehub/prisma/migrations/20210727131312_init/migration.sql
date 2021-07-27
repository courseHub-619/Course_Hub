/*
  Warnings:

  - You are about to drop the column `student` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `teacher` on the `review` table. All the data in the column will be lost.
  - Added the required column `student_id` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_student_fkey";

-- DropForeignKey
ALTER TABLE "review" DROP CONSTRAINT "review_teacher_fkey";

-- AlterTable
ALTER TABLE "review" DROP COLUMN "student",
DROP COLUMN "teacher",
ADD COLUMN     "student_id" INTEGER NOT NULL,
ADD COLUMN     "teacher_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "review" ADD FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

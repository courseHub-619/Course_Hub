/*
  Warnings:

  - You are about to drop the column `gmail` on the `student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `student` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "student.gmail_unique";

-- AlterTable
ALTER TABLE "student" DROP COLUMN "gmail",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "teacher" (
    "teacher_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "wallet" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "Availability" TEXT NOT NULL,
    "Overall_rating" TEXT NOT NULL,

    PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "post" (
    "post_id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'pending',

    PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "review" (
    "Subject" TEXT NOT NULL,
    "review_id" SERIAL NOT NULL,
    "student" INTEGER NOT NULL,
    "teacher" INTEGER NOT NULL,
    "pedagogy" INTEGER NOT NULL,
    "presentation_skills" INTEGER NOT NULL,
    "knowledge" INTEGER NOT NULL,
    "ponctuality" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,

    PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "scheduel_id" SERIAL NOT NULL,
    "student" INTEGER NOT NULL,
    "teacher" INTEGER NOT NULL,
    "appointment" TEXT NOT NULL,
    "studentCallId" INTEGER NOT NULL,

    PRIMARY KEY ("scheduel_id")
);

-- CreateTable
CREATE TABLE "attachement" (
    "attachement_id" SERIAL NOT NULL,
    "Type" TEXT NOT NULL,
    "attachement" TEXT NOT NULL,

    PRIMARY KEY ("attachement_id")
);

-- CreateTable
CREATE TABLE "free_course" (
    "freeCourse_id" SERIAL NOT NULL,
    "teacher" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT E'pending',
    "document" INTEGER NOT NULL,

    PRIMARY KEY ("freeCourse_id")
);

-- CreateTable
CREATE TABLE "DM" (
    "DM_id" SERIAL NOT NULL,
    "student" INTEGER NOT NULL,
    "teacher" INTEGER NOT NULL,
    "teacher_messages" TEXT NOT NULL,
    "student_messages" TEXT NOT NULL,

    PRIMARY KEY ("DM_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "teacher.email_unique" ON "teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "schedule.studentCallId_unique" ON "schedule"("studentCallId");

-- CreateIndex
CREATE UNIQUE INDEX "student.email_unique" ON "student"("email");

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("author_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD FOREIGN KEY ("student") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD FOREIGN KEY ("teacher") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD FOREIGN KEY ("student") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD FOREIGN KEY ("teacher") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "free_course" ADD FOREIGN KEY ("teacher") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "free_course" ADD FOREIGN KEY ("document") REFERENCES "attachement"("attachement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DM" ADD FOREIGN KEY ("student") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DM" ADD FOREIGN KEY ("teacher") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `image` to the `free_course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "free_course" ADD COLUMN     "image" TEXT NOT NULL;

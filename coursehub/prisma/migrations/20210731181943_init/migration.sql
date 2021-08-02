/*
  Warnings:

  - Added the required column `stars` to the `feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "feedback" ADD COLUMN     "stars" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `numberOfaRtes` on the `teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "teacher" DROP COLUMN "numberOfaRtes",
ADD COLUMN     "numberOfRates" INTEGER NOT NULL DEFAULT 0;

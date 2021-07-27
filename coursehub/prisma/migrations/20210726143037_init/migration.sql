/*
  Warnings:

  - Added the required column `ratesNumber` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review" ADD COLUMN     "ratesNumber" INTEGER NOT NULL;

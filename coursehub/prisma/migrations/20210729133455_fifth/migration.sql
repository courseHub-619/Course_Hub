/*
  Warnings:

  - The `Overall_rating` column on the `teacher` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "teacher" ALTER COLUMN "numberOfaRtes" SET DEFAULT 0,
ALTER COLUMN "sumOfRates" SET DEFAULT 0,
ALTER COLUMN "description" SET DEFAULT E'',
DROP COLUMN "Overall_rating",
ADD COLUMN     "Overall_rating" INTEGER NOT NULL DEFAULT 0;

/*
  Warnings:

  - You are about to drop the column `Subject` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `knowledge` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `pedagogy` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `ponctuality` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `presentation_skills` on the `review` table. All the data in the column will be lost.
  - Added the required column `overallRating` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review" DROP COLUMN "Subject",
DROP COLUMN "knowledge",
DROP COLUMN "pedagogy",
DROP COLUMN "ponctuality",
DROP COLUMN "presentation_skills",
ADD COLUMN     "overallRating" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "teacher" ADD COLUMN     "description" TEXT NOT NULL;

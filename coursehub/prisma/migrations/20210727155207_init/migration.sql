/*
  Warnings:

  - You are about to drop the column `friday` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `monday` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `saturday` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `thursday` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `tuesday` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `wednesday` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `Availability` on the `teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "friday",
DROP COLUMN "monday",
DROP COLUMN "saturday",
DROP COLUMN "thursday",
DROP COLUMN "tuesday",
DROP COLUMN "wednesday",
ADD COLUMN     "five" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "four" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "one" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "six" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "three" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "two" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "teacher" DROP COLUMN "Availability";

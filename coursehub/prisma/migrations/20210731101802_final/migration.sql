/*
  Warnings:

  - You are about to drop the column `createdAt` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "student" ALTER COLUMN "token" SET DEFAULT E'';

-- AlterTable
ALTER TABLE "teacher" ALTER COLUMN "token" SET DEFAULT E'';

/*
  Warnings:

  - You are about to drop the column `price` on the `teacher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "token" TEXT NOT NULL,
ALTER COLUMN "wallet" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "teacher" DROP COLUMN "price",
ADD COLUMN     "token" TEXT NOT NULL,
ALTER COLUMN "wallet" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "student.token_unique" ON "student"("token");

-- CreateIndex
CREATE UNIQUE INDEX "teacher.token_unique" ON "teacher"("token");

/*
  Warnings:

  - You are about to drop the column `availability` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `post` table. All the data in the column will be lost.
  - Added the required column `body` to the `post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "availability",
DROP COLUMN "description",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

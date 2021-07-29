/*
  Warnings:

  - A unique constraint covering the columns `[author_id]` on the table `post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "post.author_id_unique" ON "post"("author_id");

-- CreateTable
CREATE TABLE "admin" (
    "admin_id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    PRIMARY KEY ("admin_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin.userName_unique" ON "admin"("userName");

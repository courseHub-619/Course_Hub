-- CreateTable
CREATE TABLE "student" (
    "student_id" SERIAL NOT NULL,
    "gmail" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "wallet" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("student_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student.gmail_unique" ON "student"("gmail");

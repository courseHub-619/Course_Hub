-- CreateTable
CREATE TABLE "student" (
    "student_id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "wallet" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "teacher" (
    "teacher_id" SERIAL NOT NULL,
    "numberOfaRtes" INTEGER NOT NULL,
    "sumOfRates" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "wallet" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "Overall_rating" TEXT NOT NULL DEFAULT E'0',
    "price" INTEGER NOT NULL,

    PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "weekDay" (
    "weekDay_id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wednesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "sunday" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("weekDay_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "sessions_id" SERIAL NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "one" BOOLEAN NOT NULL DEFAULT false,
    "two" BOOLEAN NOT NULL DEFAULT false,
    "three" BOOLEAN NOT NULL DEFAULT false,
    "four" BOOLEAN NOT NULL DEFAULT false,
    "five" BOOLEAN NOT NULL DEFAULT false,
    "six" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("sessions_id")
);

-- CreateTable
CREATE TABLE "post" (
    "post_id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "Image" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT E'pending',
    "body" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "review" (
    "review_id" SERIAL NOT NULL,
    "overallRating" INTEGER NOT NULL,
    "ratesNumber" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "comments" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("review_id")
);

-- CreateTable
CREATE TABLE "schedule" (
    "scheduel_id" SERIAL NOT NULL,
    "student" INTEGER NOT NULL,
    "teacher" INTEGER NOT NULL,
    "day" INTEGER NOT NULL,
    "session" INTEGER NOT NULL,
    "studentCallId" INTEGER NOT NULL,

    PRIMARY KEY ("scheduel_id")
);

-- CreateTable
CREATE TABLE "attachement" (
    "attachement_id" SERIAL NOT NULL,
    "Type" TEXT NOT NULL,
    "attachement" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    PRIMARY KEY ("attachement_id")
);

-- CreateTable
CREATE TABLE "free_course" (
    "freeCourse_id" SERIAL NOT NULL,
    "teacher" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "Status" TEXT NOT NULL DEFAULT E'pending',
    "document" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    PRIMARY KEY ("freeCourse_id")
);

-- CreateTable
CREATE TABLE "DM" (
    "DM_id" SERIAL NOT NULL,
    "student" INTEGER NOT NULL,
    "teacher" INTEGER NOT NULL,
    "teacher_messages" TEXT NOT NULL,
    "student_messages" TEXT NOT NULL,

    PRIMARY KEY ("DM_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student.email_unique" ON "student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "teacher.email_unique" ON "teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "schedule.studentCallId_unique" ON "schedule"("studentCallId");

-- AddForeignKey
ALTER TABLE "weekDay" ADD FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD FOREIGN KEY ("author_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD FOREIGN KEY ("student_id") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD FOREIGN KEY ("student") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD FOREIGN KEY ("teacher") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD FOREIGN KEY ("day") REFERENCES "weekDay"("weekDay_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD FOREIGN KEY ("session") REFERENCES "sessions"("sessions_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "free_course" ADD FOREIGN KEY ("document") REFERENCES "attachement"("attachement_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "free_course" ADD FOREIGN KEY ("teacher") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DM" ADD FOREIGN KEY ("student") REFERENCES "student"("student_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DM" ADD FOREIGN KEY ("teacher") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

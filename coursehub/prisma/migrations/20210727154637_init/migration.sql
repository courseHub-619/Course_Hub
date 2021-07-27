/*
  Warnings:

  - You are about to drop the column `appointment` on the `schedule` table. All the data in the column will be lost.
  - Added the required column `day` to the `schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedule" DROP COLUMN "appointment",
ADD COLUMN     "day" INTEGER NOT NULL,
ADD COLUMN     "session" INTEGER NOT NULL;

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
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wednesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("sessions_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "weekDay.teacher_id_unique" ON "weekDay"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions.teacher_id_unique" ON "sessions"("teacher_id");

-- AddForeignKey
ALTER TABLE "weekDay" ADD FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD FOREIGN KEY ("teacher_id") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD FOREIGN KEY ("day") REFERENCES "weekDay"("weekDay_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedule" ADD FOREIGN KEY ("session") REFERENCES "sessions"("sessions_id") ON DELETE CASCADE ON UPDATE CASCADE;

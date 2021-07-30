-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_day_fkey";

-- DropForeignKey
ALTER TABLE "schedule" DROP CONSTRAINT "schedule_session_fkey";

-- AlterTable
ALTER TABLE "schedule" ALTER COLUMN "day" SET DATA TYPE TEXT,
ALTER COLUMN "session" SET DATA TYPE TEXT;

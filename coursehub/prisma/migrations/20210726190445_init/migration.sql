-- AlterTable
ALTER TABLE "student" ALTER COLUMN "wallet" DROP DEFAULT;

-- AlterTable
ALTER TABLE "teacher" ALTER COLUMN "wallet" DROP DEFAULT,
ALTER COLUMN "Overall_rating" DROP DEFAULT,
ALTER COLUMN "Overall_rating" SET DATA TYPE TEXT;

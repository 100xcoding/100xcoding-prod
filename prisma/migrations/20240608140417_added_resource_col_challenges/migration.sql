-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_challengeResourceId_fkey";

-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "resource" TEXT;

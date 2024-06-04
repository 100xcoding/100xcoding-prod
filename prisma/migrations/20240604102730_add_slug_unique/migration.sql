/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Challenge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorId` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Challenge" DROP CONSTRAINT "Challenge_challengeCategoryId_fkey";

-- AlterTable
ALTER TABLE "Challenge" ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "publish" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "challengeCategoryId" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "task" DROP NOT NULL,
ALTER COLUMN "about" DROP NOT NULL,
ALTER COLUMN "requirements" DROP NOT NULL,
ALTER COLUMN "steps" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Challenge_slug_key" ON "Challenge"("slug");

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengeCategoryId_fkey" FOREIGN KEY ("challengeCategoryId") REFERENCES "ChallengeCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `challengeSolutionId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `challengeSolutionSlug` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_challengeSolutionId_fkey";

-- DropIndex
DROP INDEX "Comment_challengeSolutionId_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "challengeSolutionId",
ADD COLUMN     "challengeSolutionSlug" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Comment_challengeSolutionSlug_idx" ON "Comment"("challengeSolutionSlug");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_challengeSolutionSlug_fkey" FOREIGN KEY ("challengeSolutionSlug") REFERENCES "ChallengeSolution"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

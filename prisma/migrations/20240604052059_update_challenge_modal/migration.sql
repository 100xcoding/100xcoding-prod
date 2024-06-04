/*
  Warnings:

  - You are about to drop the column `challengeResources` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `challengeTechIds` on the `Challenge` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `ChallengeResource` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "challengeResources",
DROP COLUMN "challengeTechIds",
ADD COLUMN     "challengeResourceId" TEXT,
ADD COLUMN     "challengeTechId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ChallengeResource" ADD COLUMN     "type" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengeCategoryId_fkey" FOREIGN KEY ("challengeCategoryId") REFERENCES "ChallengeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengeTechId_fkey" FOREIGN KEY ("challengeTechId") REFERENCES "ChallengeTech"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Challenge" ADD CONSTRAINT "Challenge_challengeResourceId_fkey" FOREIGN KEY ("challengeResourceId") REFERENCES "ChallengeResource"("id") ON DELETE SET NULL ON UPDATE CASCADE;

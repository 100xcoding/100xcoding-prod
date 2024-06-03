/*
  Warnings:

  - You are about to drop the column `resumeUrl` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `SocialLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[socialLinkId]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Made the column `socialLinkId` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `profileId` to the `SocialLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "SocialLink_userId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "resumeUrl",
ADD COLUMN     "resume" TEXT,
ALTER COLUMN "socialLinkId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SocialLink" DROP COLUMN "userId",
ADD COLUMN     "profileId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_socialLinkId_key" ON "Profile"("socialLinkId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_socialLinkId_fkey" FOREIGN KEY ("socialLinkId") REFERENCES "SocialLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

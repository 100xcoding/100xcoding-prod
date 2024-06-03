/*
  Warnings:

  - You are about to drop the column `socialLinkId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `SocialLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resume]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `SocialLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `SocialLink` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_socialLinkId_fkey";

-- DropIndex
DROP INDEX "Profile_socialLinkId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "socialLinkId";

-- AlterTable
ALTER TABLE "SocialLink" DROP COLUMN "profileId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_resume_key" ON "Profile"("resume");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLink_userId_key" ON "SocialLink"("userId");

-- AddForeignKey
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `SocialLinkType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSocialLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserSocialLink" DROP CONSTRAINT "UserSocialLink_socialLinkTypeId_fkey";

-- DropForeignKey
ALTER TABLE "UserSocialLink" DROP CONSTRAINT "UserSocialLink_userId_fkey";

-- DropTable
DROP TABLE "SocialLinkType";

-- DropTable
DROP TABLE "UserSocialLink";

-- CreateTable
CREATE TABLE "SocialLinkType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "SocialLinkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSocialLink" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "socialLinkTypeId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "UserSocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialLinkType_name_key" ON "SocialLinkType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SocialLinkType_icon_key" ON "SocialLinkType"("icon");

-- CreateIndex
CREATE INDEX "UserSocialLink_userId_idx" ON "UserSocialLink"("userId");

-- CreateIndex
CREATE INDEX "UserSocialLink_socialLinkTypeId_idx" ON "UserSocialLink"("socialLinkTypeId");

-- AddForeignKey
ALTER TABLE "UserSocialLink" ADD CONSTRAINT "UserSocialLink_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSocialLink" ADD CONSTRAINT "UserSocialLink_socialLinkTypeId_fkey" FOREIGN KEY ("socialLinkTypeId") REFERENCES "SocialLinkType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

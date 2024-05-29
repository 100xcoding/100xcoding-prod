-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "bio" TEXT,
    "website" TEXT,
    "profileImageUrl" TEXT,
    "resumeUrl" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "github" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "youtube" TEXT,
    "medium" TEXT,
    "threads" TEXT,
    "leetcode" TEXT,
    "gfg" TEXT,
    "codechef" TEXT,
    "codeforces" TEXT,
    "linkedIn" TEXT,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

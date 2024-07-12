-- CreateTable
CREATE TABLE "ChallengeSolution" (
    "id" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "cssContent" TEXT NOT NULL,
    "jsContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ChallengeSolution_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChallengeSolution_challengeId_idx" ON "ChallengeSolution"("challengeId");

-- CreateIndex
CREATE INDEX "ChallengeSolution_userId_idx" ON "ChallengeSolution"("userId");

-- AddForeignKey
ALTER TABLE "ChallengeSolution" ADD CONSTRAINT "ChallengeSolution_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeSolution" ADD CONSTRAINT "ChallengeSolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

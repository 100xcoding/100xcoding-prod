-- AlterTable
ALTER TABLE "Resource" ADD COLUMN     "resourceLanguageId" TEXT;

-- CreateTable
CREATE TABLE "ResourceLanguage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ResourceLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResourceLanguage_name_key" ON "ResourceLanguage"("name");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_resourceLanguageId_fkey" FOREIGN KEY ("resourceLanguageId") REFERENCES "ResourceLanguage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

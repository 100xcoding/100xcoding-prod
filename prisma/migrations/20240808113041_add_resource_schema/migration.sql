-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "creatorId" TEXT NOT NULL,
    "isPublish" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "resourceTypeId" TEXT,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ResourceType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ResourceTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResourceToTag" (
    "resourceId" TEXT NOT NULL,
    "resourceTagId" TEXT NOT NULL,

    CONSTRAINT "ResourceToTag_pkey" PRIMARY KEY ("resourceId","resourceTagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ResourceType_name_key" ON "ResourceType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ResourceTag_name_key" ON "ResourceTag"("name");

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_resourceTypeId_fkey" FOREIGN KEY ("resourceTypeId") REFERENCES "ResourceType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceToTag" ADD CONSTRAINT "ResourceToTag_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResourceToTag" ADD CONSTRAINT "ResourceToTag_resourceTagId_fkey" FOREIGN KEY ("resourceTagId") REFERENCES "ResourceTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

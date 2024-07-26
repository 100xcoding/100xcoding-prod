/*
  Warnings:

  - You are about to drop the column `challengeResourceId` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `steps` on the `Challenge` table. All the data in the column will be lost.
  - You are about to drop the column `task` on the `Challenge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "challengeResourceId",
DROP COLUMN "requirements",
DROP COLUMN "steps",
DROP COLUMN "task";

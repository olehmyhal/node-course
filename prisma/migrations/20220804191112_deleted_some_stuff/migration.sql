/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PromotionOnCity` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PromotionOnCity` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `PromotionOnTag` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PromotionOnTag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PromotionOnCity" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "PromotionOnTag" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

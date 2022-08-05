/*
  Warnings:

  - You are about to drop the `Pizza` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PizzaOnCity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PizzaOnTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PizzaOnCity" DROP CONSTRAINT "PizzaOnCity_cityId_fkey";

-- DropForeignKey
ALTER TABLE "PizzaOnCity" DROP CONSTRAINT "PizzaOnCity_pizzaId_fkey";

-- DropForeignKey
ALTER TABLE "PizzaOnTag" DROP CONSTRAINT "PizzaOnTag_pizzaId_fkey";

-- DropForeignKey
ALTER TABLE "PizzaOnTag" DROP CONSTRAINT "PizzaOnTag_postId_fkey";

-- DropTable
DROP TABLE "Pizza";

-- DropTable
DROP TABLE "PizzaOnCity";

-- DropTable
DROP TABLE "PizzaOnTag";

-- CreateTable
CREATE TABLE "Promotion" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdDiscountAt" TIMESTAMP(3) NOT NULL,
    "endDiscountAt" TIMESTAMP(3) NOT NULL,
    "publishDiscountAt" TIMESTAMP(3) NOT NULL,
    "link" TEXT,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromotionOnCity" (
    "promotionId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromotionOnCity_pkey" PRIMARY KEY ("promotionId","cityId")
);

-- CreateTable
CREATE TABLE "PromotionOnTag" (
    "promotionId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromotionOnTag_pkey" PRIMARY KEY ("promotionId","postId")
);

-- AddForeignKey
ALTER TABLE "PromotionOnCity" ADD CONSTRAINT "PromotionOnCity_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionOnCity" ADD CONSTRAINT "PromotionOnCity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionOnTag" ADD CONSTRAINT "PromotionOnTag_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromotionOnTag" ADD CONSTRAINT "PromotionOnTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

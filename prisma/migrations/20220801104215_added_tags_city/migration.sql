/*
  Warnings:

  - The primary key for the `Pizza` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Pizza` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Pizza` table. All the data in the column will be lost.
  - The `id` column on the `Pizza` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `createdDiscountAt` to the `Pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDiscountAt` to the `Pizza` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publishDiscountAt` to the `Pizza` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pizza" DROP CONSTRAINT "Pizza_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "createdDiscountAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endDiscountAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "link" TEXT,
ADD COLUMN     "publishDiscountAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PizzaOnCity" (
    "pizzaId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PizzaOnCity_pkey" PRIMARY KEY ("pizzaId","cityId")
);

-- CreateTable
CREATE TABLE "PizzaOnTag" (
    "pizzaId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PizzaOnTag_pkey" PRIMARY KEY ("pizzaId","postId")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PizzaOnCity" ADD CONSTRAINT "PizzaOnCity_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaOnCity" ADD CONSTRAINT "PizzaOnCity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaOnTag" ADD CONSTRAINT "PizzaOnTag_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaOnTag" ADD CONSTRAINT "PizzaOnTag_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

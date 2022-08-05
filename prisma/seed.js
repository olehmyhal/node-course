import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tagSeedData = {
  title: "new",
};

const tagSeedData2 = {
  title: "hot",
};

const citySeedData = {
  name: "Kyiv",
};

const citySeedData2 = {
  name: "Dnipro",
};

const promotionSeedData = {
  image:
    "https://png.pngtree.com/png-clipart/20200727/original/pngtree-modern-delicious-burger-promotion-poster-png-image_5335151.jpg",
  title: "Tasty Burger",
  description: "Tasty Burger with a good price! What can be better?!",
  createdDiscountAt: "2022-08-01T14:17:32.914Z",
  endDiscountAt: "2022-09-04T14:17:32.914Z",
  publishDiscountAt: "2022-07-30T14:17:32.914Z",
};

const main = async () => {
  await prisma.$connect();

  await prisma.promotionOnCity.deleteMany({});
  await prisma.promotionOnTag.deleteMany({});
  await prisma.city.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.promotion.deleteMany({});

  await prisma.promotion.create({
    data: {
      ...promotionSeedData,
      city: {
        create: [citySeedData, citySeedData2].map((cityVal) => ({
          city: { create: { name: cityVal.name } },
        })),
      },
      tags: {
        create: [tagSeedData, tagSeedData2].map((tagVal) => ({
          tag: { create: { title: tagVal.title } },
        })),
      },
    },
  });
  console.log("Seeding is successfully done");
  await prisma.$disconnect();
};

main();

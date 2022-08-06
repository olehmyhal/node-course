import { Scenes } from "telegraf";
import { PrismaService } from "../database/prisma.service.js";
import { BotContext } from "./telegraf.service.interface.js";

export class SceneGenerator {
  private prismaService: PrismaService;

  contructor() {
    this.prismaService = new PrismaService();
  }

  GenCityGenerator() {
    const city = new Scenes.BaseScene<BotContext>("city");

    city.enter(async (ctx) => {
      await ctx.reply("Please enter your city");
    });

    city.on("text", async (ctx) => {
      console.log(!this.prismaService);
      const doesCityExist = await this.prismaService.client.city.findFirst({
        where: {
          name: ctx.message.text,
        },
      });

      console.log(doesCityExist);
    });

    city.on("message", (ctx) => {
      console.log("message", ctx.message);
    });

    return city;
  }
}

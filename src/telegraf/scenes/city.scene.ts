import { Scenes } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import { PrismaService } from "../../database/prisma.service";
import { BotContext } from "../../types/bot.types";
import { BaseScene } from "./base.scene.js";
import { Scene } from "./scene.interface";

export class CityScene extends BaseScene implements Scene {
  currentScene: Scenes.BaseScene<BotContext>;

  constructor(private prismaService: PrismaService) {
    super("Please choose ur city");
  }

  createScene() {
    this.currentScene = new Scenes.BaseScene<BotContext>("city");

    this.currentScene.enter(async (ctx) => {
      const cities = await this.prismaService.getInstance().city.findMany({});
      let messageCitiesId: Pick<Message.TextMessage, "message_id"> | undefined;

      if (!cities) {
        ctx.reply("Smth is wrong, please try later..");
        ctx.scene.reenter();
      }

      if (!ctx.chat) {
        return ctx.reply("There is no data about chat");
      }

      messageCitiesId = await this.returnInlineMarkupSend(ctx, cities);

      const list = cities.map((x) => x.name);
      this.currentScene.action(list, async (ctx) => {
        ctx.reply(
          "Your answers are saved! You always can back and edit your information"
        );
        ctx.session.city = cities.find(
          (city) => city.name === ctx.match.input
        )!;
        ctx.telegram.editMessageText(
          ctx.chat?.id,
          messageCitiesId?.message_id,
          undefined,
          `You are from ${ctx.match.input}`
        );
        return ctx.scene.enter("tags");
      });
    });

    return this.currentScene;
  }

  getScene() {
    return this.currentScene;
  }

  enter() {
    return this.currentScene.enter();
  }

  leave() {
    return this.currentScene.leave();
  }
}

import { Scenes } from "telegraf";
import { Message } from "telegraf/typings/core/types/typegram";
import { PrismaService } from "../../database/prisma.service";
import { BotContext } from "../../types/bot.types";
import { Status } from "../../types/enums.js";
import { BaseScene } from "./base.scene.js";
import { Scene } from "./scene.interface";

export class TagsScene extends BaseScene implements Scene {
  currentScene: Scenes.BaseScene<BotContext>;

  constructor(private prismaService: PrismaService) {
    super("Please choose your tags");
  }

  createScene() {
    this.currentScene = new Scenes.BaseScene<BotContext>("tags");

    this.currentScene.enter(async (ctx) => {
      const tags = await this.prismaService.getInstance().tag.findMany({});
      const result: string[] = [];
      let messageTagsId: Pick<Message.TextMessage, "message_id"> | undefined;

      if (!tags) {
        ctx.reply("Smth is wrong, please try later..");
        ctx.scene.reenter();
      }

      if (!ctx.chat) {
        return ctx.reply("There is no data about chat");
      }

      messageTagsId = await this.returnInlineMarkupSend(ctx, tags);

      const list = tags.map((x) => x.name);
      this.currentScene.action([...list, Status.DONE], async (ctx) => {
        if (ctx.match.input === Status.DONE) {
          await ctx.telegram.editMessageText(
            ctx.chat?.id,
            messageTagsId?.message_id,
            undefined,
            `You choosed next topics: ${result.join(", ")}`
          );
          ctx.reply(
            "Your answers are saved! You always can back and edit your information"
          );
          ctx.session.tags = tags.filter((tag) => result.includes(tag.name));
          return ctx.scene.leave();
        }

        result.includes(ctx.match.input)
          ? result.splice(result.indexOf(ctx.match.input), 1)
          : result.push(ctx.match.input);

        if (messageTagsId) {
          this.returnInlineMarkupEdit(
            ctx,
            tags,
            result,
            messageTagsId.message_id
          );
        }
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

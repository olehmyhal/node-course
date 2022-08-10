import { Scenes, Telegraf } from "telegraf";
import { PrismaService } from "../database/prisma.service.js";
import { BotContext } from "./telegraf.service.interface.js";

export class SceneGenerator {
  private prismaService: PrismaService;

  constructor() {
    this.prismaService = new PrismaService();
  }

  SceneCityGenerator() {
    const city = new Scenes.BaseScene<BotContext>("city");

    city.enter(async (ctx) => {
      await ctx.reply("Please enter your city");
    });

    city.on("text", async (ctx) => {
      const cityRes = await this.prismaService.getInstance().city.findFirst({
        where: {
          name: ctx.message.text,
        },
      });

      if (!cityRes) {
        return ctx.scene.reenter();
      }

      ctx.session.city = cityRes;
      ctx.scene.enter("tags");
    });

    city.on("message", (ctx) => {
      ctx.scene.reenter();
    });

    return city;
  }

  SceneTagsGenerator(bot: Telegraf<BotContext>) {
    const tag = new Scenes.BaseScene<BotContext>("tags");

    tag.enter(async (ctx) => {
      const tags = await this.prismaService.getInstance().tag.findMany({});
      //TODO: change any
      const result: string[] = [];
      let messageTagsId: any = null;

      if (!tags) {
        ctx.reply("Smth is wrong, please try later..");
        ctx.scene.reenter();
      }

      if (!ctx.chat) {
        return ctx.reply("There is no data about chat");
      }

      messageTagsId = await ctx.telegram.sendMessage(
        ctx.chat.id,
        "Please, choose topics in which you are interested.",
        {
          reply_markup: {
            inline_keyboard: [
              ...tags.map((x) => [
                {
                  text: `${result.includes(x.title) ? "X" : ""} ${x.title}`,
                  callback_data: x.title,
                },
              ]),
              [{ text: "Done", callback_data: "Done" }],
            ],
          },
        }
      );

      const list = tags.map((x) => x.title);
      bot.action([...list, "Done"], (ctx) => {
        if (ctx.match.input === "Done") {
          ctx.telegram.editMessageText(
            ctx.chat?.id,
            messageTagsId.message_id,
            undefined,
            `You choosed next topics: ${result.join(", ")}`
          );
          ctx.reply(
            "Your answers are saved! You always can back and edit your information"
          );
          ctx.session.tags = result;
          return ctx.scene.leave();
        }

        result.includes(ctx.match.input)
          ? result.splice(result.indexOf(ctx.match.input), 1)
          : result.push(ctx.match.input);

        if (messageTagsId) {
          ctx.telegram.editMessageText(
            ctx.chat?.id,
            messageTagsId.message_id,
            undefined,
            "Please, choose topics in which you are interested.",
            {
              reply_markup: {
                inline_keyboard: [
                  ...tags.map((x) => [
                    {
                      text: `${result.includes(x.title) ? "X" : ""} ${x.title}`,
                      callback_data: x.title,
                    },
                  ]),
                  [{ text: "Done", callback_data: "Done" }],
                ],
              },
            }
          );
        }
      });
    });

    return tag;
  }
}

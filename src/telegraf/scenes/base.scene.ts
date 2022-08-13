import { BotContext } from "../../types/bot.types";
import { Status } from "../../types/enums.js";

const CHECK_SIGN = "\u{0000274c}";

type DataType = { name: string };

export class BaseScene {
  constructor(private message: string) {}
  returnInlineMarkupSend<T extends DataType>(ctx: BotContext, valuesArr: T[]) {
    if (!ctx.chat) {
      return;
    }

    return ctx.telegram.sendMessage(ctx.chat.id, this.message, {
      reply_markup: {
        inline_keyboard: [
          ...valuesArr.map((x) => [
            {
              text: `${x.name}`,
              callback_data: x.name,
            },
          ]),
          [{ text: Status.DONE, callback_data: Status.DONE }],
        ],
      },
    });
  }

  returnInlineMarkupEdit<T extends DataType>(
    ctx: BotContext,
    valuesArr: T[],
    result: string[],
    messageTagsId: number
  ) {
    return ctx.telegram.editMessageText(
      ctx.chat?.id,
      messageTagsId,
      undefined,
      this.message,
      {
        reply_markup: {
          inline_keyboard: [
            ...valuesArr.map((x) => [
              {
                text: `${result.includes(x.name) ? CHECK_SIGN : ""} ${x.name}`,
                callback_data: x.name,
              },
            ]),
            [{ text: Status.DONE, callback_data: Status.DONE }],
          ],
        },
      }
    );
  }
}

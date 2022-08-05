import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";

export class TelegrafService {
  private bot: Telegraf;

  constructor(private readonly token: string) {
    this.bot = new Telegraf(token);
  }

  launch() {
    this.bot.use(new LocalSession({ database: "../session.js" }).middleware());
    this.bot.command("start", (ctx) => {
      ctx.reply("Hello stranger!");
    });

    this.bot.launch();

    return this.bot;
  }
}

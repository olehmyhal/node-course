import { Scenes, Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import { SceneGenerator } from "./scenes.service.js";
import { BotContext } from "./telegraf.service.interface.js";

export class TelegrafService {
  private bot: Telegraf<BotContext>;

  constructor(private readonly token: string) {
    this.bot = new Telegraf<BotContext>(token);
  }

  launch() {
    const scenes = new SceneGenerator();
    const cityScene = scenes.GenCityGenerator();

    const stage = new Scenes.Stage<BotContext>([cityScene]);

    // this.bot.use(new LocalSession({ database: "../session.js" }).middleware());
    this.bot.use(stage.middleware());

    this.bot.command("start", async (ctx) => {
      console.log(Object.keys(ctx));
      ctx.reply("Hello stranger");
      ctx.scene.enter("city");
    });

    this.bot.launch();

    return this.bot;
  }
}

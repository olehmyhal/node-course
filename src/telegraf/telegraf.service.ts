import { Scenes, Telegraf } from "telegraf";
import { LocalSessionService } from "../localSession/localSession.service.js";
import { SceneGenerator } from "./scenes.service.js";
import { BotContext } from "./telegraf.service.interface.js";

export class TelegrafService {
  private bot: Telegraf<BotContext>;
  private localSessionService: LocalSessionService;

  constructor(private readonly token: string) {
    this.bot = new Telegraf<BotContext>(token);
    this.localSessionService = new LocalSessionService();
  }

  launch() {
    const scenes = new SceneGenerator();
    const cityScene = scenes.SceneCityGenerator();
    const tagsScene = scenes.SceneTagsGenerator(this.bot);

    const stage = new Scenes.Stage<BotContext>([cityScene, tagsScene]);

    this.bot.use(this.localSessionService.middleware());
    this.bot.use(stage.middleware());

    this.bot.command("start", (ctx) => {
      ctx.reply("Hello stranger");
      if (!ctx.session.city || !ctx.session.tags) {
        ctx.scene.enter("city");
      }
    });

    this.bot.launch();

    return this.bot;
  }
}

import { Scenes, Telegraf } from "telegraf";
import { PrismaService } from "../database/prisma.service.js";
import { LocalSessionService } from "../localSession/localSession.service.js";
import { SceneGenerator } from "./scenes.service.js";
import { BotContext } from "../types/bot.types";
import { CityScene } from "./scenes/city.scene.js";
import { TagsScene } from "./scenes/tags.scene.js";

export class TelegrafService {
  private bot: Telegraf<BotContext>;
  private localSessionService: LocalSessionService;

  constructor(private readonly token: string) {
    this.bot = new Telegraf<BotContext>(token);
    this.localSessionService = new LocalSessionService();
  }

  launch(prismaService: PrismaService) {
    const cityScene = new SceneGenerator(new CityScene(prismaService)).init();
    const tagScene = new SceneGenerator(new TagsScene(prismaService)).init();

    const stage = new Scenes.Stage<BotContext>([cityScene, tagScene]);

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

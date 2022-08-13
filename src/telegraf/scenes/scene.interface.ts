import { Scenes } from "telegraf";
import { BotContext } from "../../types/bot.types";

export abstract class Scene {
  createScene: () => Scenes.BaseScene<BotContext>;
  enter: () => void;
  leave: () => void;
  getScene: () => Scenes.BaseScene<BotContext>;
}

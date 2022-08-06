import { Context, Scenes } from "telegraf";

export interface BotSessionScene extends Scenes.SceneSessionData {}
export interface BotSession extends Scenes.SceneSession<BotSessionScene> {}

export interface BotContext extends Context {
  session: BotSession;
  scene: Scenes.SceneContextScene<BotContext, BotSessionScene>;
}

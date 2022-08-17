import LocalSession from "telegraf-session-local";
import { BotSession } from "../types/bot.types";

export class LocalSessionService {
  public localSessionService: LocalSession<BotSession>;

  constructor() {
    this.localSessionService = new LocalSession({
      database: "./session.json",
    });
  }

  middleware() {
    return this.localSessionService.middleware();
  }
}

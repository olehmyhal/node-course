import LocalSession from "telegraf-session-local";
import { BotSession } from "../telegraf/telegraf.service.interface";

export class LocalSessionService {
  public localSessionService: LocalSession<BotSession>;

  constructor() {
    this.localSessionService = new LocalSession({
      database: "./session.js",
    });
  }

  middleware() {
    return this.localSessionService.middleware();
  }
}

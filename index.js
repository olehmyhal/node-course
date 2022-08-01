import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";

const token = process.env.TG_TOKEN;
if (!token) {
  throw new Error("There is no token");
}

const bot = new Telegraf(token);
bot.use(new LocalSession({ database: "session.js" }).middleware());

bot.command("start", (ctx) => {
  ctx.reply("Hello stranger");
});

bot.launch();

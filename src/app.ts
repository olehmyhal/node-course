import { PrismaService } from "./database/prisma.service.js";
import { TelegrafService } from "./telegraf/telegraf.service.js";

const token = process.env.TG_TOKEN;

export class App {
  private prismaService: PrismaService;

  constructor() {
    this.prismaService = new PrismaService();
  }

  async init() {
    if (!token) {
      throw new Error("There is no token");
    }

    const telegrafService = new TelegrafService(token);
    telegrafService.launch();

    await this.prismaService.connect();
  }
}

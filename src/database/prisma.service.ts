import { PrismaClient } from "@prisma/client";

export class PrismaService {
  protected client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      console.log("[PrismaService] - you successfully connected to server");
    } catch (e) {
      console.log(
        "[PrismaService] - error while connecting to the server: ",
        e
      );
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}

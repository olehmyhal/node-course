import { PrismaClient } from "@prisma/client";

export class PrismaService {
  constructor() {
    this.client = new PrismaClient();
  }

  async connect() {
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

  async disconnect() {
    await this.client.$disconnect();
  }
}

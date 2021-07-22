import pino from "pino";
import { buildLogger } from "../utils/logger";
import prismaPkg from "@prisma/client";
import { PrismaClient } from ".prisma/client";

export class ArtistDao {
  logger: pino.Logger = buildLogger("artist:dao");
  client = new PrismaClient();

  public async findByName(name: string): Promise<prismaPkg.artist | null> {
    return await this.client.artist.findFirst({
      where: {
        name,
      },
    });
  }
  public async all(): Promise<prismaPkg.artist[]> {
    return await this.client.artist.findMany();
  }

  public async insert(artist: prismaPkg.artist) {
    const result = await this.client.artist.create({ data: artist });
    this.logger.info(`result: ${result.id}`);
  }
}

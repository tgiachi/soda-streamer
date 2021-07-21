import pino from "pino";
import { buildLogger } from "../utils/logger";
import prismaPkg from "@prisma/client";
import { PrismaClient } from ".prisma/client";

export class TrackDao {
  logger: pino.Logger = buildLogger("artist:dao");
  client = new PrismaClient();

  public async findTrackByMd5(md5: string): Promise<prismaPkg.track | null> {
    return await this.client.track.findFirst({
      where: {
        md5Hash: md5,
      },
    });
  }
}

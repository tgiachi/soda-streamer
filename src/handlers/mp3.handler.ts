import { IFileHandler } from "../interfaces/ifilehandler";
import { IFileScanResult } from "../services/scan.service";
import { RegisterFileHandler } from "../types/decorators/filehandler.decorator";
import { buildLogger } from "../utils/logger";
const logger = buildLogger("filehandler:mp3");
import * as mm from "music-metadata";
import util from "util";
import { ArtistDao } from "../dao/artist.dao";
@RegisterFileHandler("mp3")
export class MP3FileHandler implements IFileHandler {
  artistDao: ArtistDao = new ArtistDao();
  async processFile(file: IFileScanResult): Promise<void> {
    const tags = await mm.parseFile(file.path);
    logger.info(`${tags.common.artist} - ${tags.common.title}`);
    if (tags.common.artist) {
      if (this.artistDao.findByName(tags.common.artist) === null) {
        this.artistDao.insert({
          name: tags.common.artist,
          coverUrl: "",
          createdAt: new Date(),
          id: BigInt(0),
          mId: "",
          updatedAt: new Date(),
        });
      }
    }
  }
}

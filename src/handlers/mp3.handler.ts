import { IFileHandler } from "../interfaces/ifilehandler";
import { IFileScanResult } from "../services/scan.service";
import { RegisterFileHandler } from "../types/decorators/filehandler.decorator";
import { buildLogger } from "../utils/logger";
const logger = buildLogger("filehandler:mp3");
import * as mm from "music-metadata";
import util from "util";
@RegisterFileHandler("mp3")
export class MP3FileHandler implements IFileHandler {
  async processFile(file: IFileScanResult): Promise<void> {
    const tags = await mm.parseFile(file.path);
    logger.info(`${tags.common.title}`);
  }
}

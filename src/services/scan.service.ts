import pino from "pino";
import { buildLogger } from "../utils/logger";
import fs from "fs/promises";
import md5File from "md5-file";
import { fileHandlerFactory } from "../types/decorators/filehandler.decorator";
import { TrackDao } from "../dao/track.dao";
import { Queue } from "queue-typescript";

export interface IFileScanResult {
  path: string;
  name: string;
  extension: string;
}

export class ScanService {
  private static instance: ScanService;

  public static getInstance(): ScanService {
    if (!ScanService.instance) {
      ScanService.instance = new ScanService();
    }

    return ScanService.instance;
  }

  private constructor() {}

  logger: pino.Logger = buildLogger("service:scanservice");
  trackDao: TrackDao = new TrackDao();
  queueChunk: number = 5;

  public async scanDirectory(path = "./"): Promise<IFileScanResult[]> {
    if (!path.endsWith("/")) path = `${path}/`;

    this.logger.info(`Start scan directory: ${path}`);
    const entries = await fs.readdir(path, { withFileTypes: true });

    // Get files within the current directory and add a path key to the file objects
    const files = entries
      .filter((file) => !file.isDirectory())
      .map((file) => ({
        ...file,
        path: path + file.name,
        name: file.name,
        extension: file.name.split(".").pop() || "",
      }));

    const folders = entries.filter((folder) => folder.isDirectory());

    for (const folder of folders)
      files.push(...(await this.scanDirectory(`${path}${folder.name}/`)));

    return files;
  }

  public async processFiles(files: IFileScanResult[]) {
    while (files.length > 0) {
      let chunk: IFileScanResult[] = [];
      for (let i = 0; i < this.queueChunk; i++) {
        chunk = files.splice(0, 1);
      }
      this.logger.info(`Chunk of ${this.queueChunk} remaining ${files.length}`);
      await Promise.all(chunk.map((f) => this.processFile(f)));
    }
  }

  public async processFile(file: IFileScanResult) {
    if (this.canProcessFile(file)) {
      const md5 = await md5File(file.path);
      this.logger.info(`Md5 for file: ${file.name} is ${md5}`);
      if (this.trackDao.findTrackByMd5(md5) !== null) {
        for (const handler of fileHandlerFactory.newFileHandlers(
          file.extension
        )) {
          await handler.processFile(file);
        }
      } else {
        this.logger.warn(
          `Dropping file ${file.name}, already exists in database`
        );
      }
    }
  }

  private canProcessFile(file: IFileScanResult): boolean {
    return fileHandlerFactory.canProcessExtension(file.extension);
  }
}

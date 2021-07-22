import "reflect-metadata";
import fastify from "fastify";
import { buildLogger } from "./utils/logger";
import * as handlers from "./handlers";
import { ScanService } from "./services/scan.service";

const server = fastify({
  logger: true,
});
const logger = buildLogger("server");

server.listen(8000, (err, address) => {
  logger.info(`Preloading file handlers `);
  Object.keys(handlers);
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`Server listening 🚀  at ${address}`);
  const path = "\\\\192.168.0.201\\MP3";
  ScanService.getInstance()

    .scanDirectory(path)
    .then((files) => {
      ScanService.getInstance().processFiles(files);
    });
});

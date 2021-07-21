import "reflect-metadata";
import fastify from "fastify";
import { buildLogger } from "./utils/logger";
import * as handlers from "./handlers";

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
});

import fastify from "fastify";
import { buildLogger } from "./utils/logger";

const server = fastify();
const logger = buildLogger("server");

server.listen(8000, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1)
  }
  logger.info(`Server listening at ${address}`)
})
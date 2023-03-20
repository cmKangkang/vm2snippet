import Koa from "koa";
import pino from "pino";

import { helloworld, snippet } from "./routes";
import { logReq } from "./middlewares";

const PORT = 8088;
const app = new Koa();
const logger = pino();

app.use(logReq);

app.use(helloworld.routes()).use(helloworld.allowedMethods());
app.use(snippet.routes()).use(snippet.allowedMethods());

app.listen(PORT);

logger.info(`engine running on port ${PORT}`);

// // 未捕获的Api异常
app.on("request-error", (...args) => {
  logger.error("RequestError", ...args);
});

process.on("uncaughtException", (error: Error) => {
  logger.error("UncaughtException", error);
});

process.on("unhandledRejection", (reason: any, promise: any) => {
  logger.info(reason, promise);
});

process.on("SIGTERM", async () => {
  logger.info("Starting graceful shutdown");
  process.exit();
});

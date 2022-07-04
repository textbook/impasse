import http from "node:http";

import app from "./app";
import config from "./config";
import logger from "./logger";

const server = http.createServer(app);

server.listen(config.port);

server.on("listening", () => {
	const addr = server.address();
	const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
	logger.info("listening on: %s", bind);
});

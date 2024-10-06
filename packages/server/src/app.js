import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";

import config from "./config.js";
import { configuredHelmet, configuredMorgan, httpsOnly, logErrors } from "./middleware.js";
import api from "./password/index.js";
import docs from "./docs.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(configuredHelmet());
app.use(configuredMorgan());

if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use("/api", api);
app.use("/docs", docs);
app.use(express.static(path.join(__dirname, "static")));

app.use(logErrors());

export default app;

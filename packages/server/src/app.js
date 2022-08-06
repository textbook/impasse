import path from "node:path";

import express from "express";

import config from "./config";
import { configuredHelmet, configuredMorgan, httpsOnly, logErrors } from "./middleware";
import api from "./password";
import docs from "./docs";

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

import express from "express";
import path from "path";

import config from "./config";
import api from "./password/controller";
import { configuredHelmet, configuredMorgan, httpsOnly, logErrors } from "./middleware";
import swagger from "./swagger";

const app = express();

app.use(configuredHelmet());
app.use(configuredMorgan());

if (config.production) {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use("/api", api);
app.use("/docs", swagger);
app.use(express.static(path.join(__dirname, "static")));

app.use(logErrors());

export default app;

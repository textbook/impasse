import express from "express";
import morgan from "morgan";
import path from "path";

import api from "./api";
import { configuredHelmet, httpsOnly } from "./middleware";
import swagger from "./swagger";

const app = express();

app.use(configuredHelmet());
app.use(morgan("dev"));

if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.use("/api", api);
app.use("/docs", swagger);
app.use(express.static(path.join(__dirname, "static")));

export default app;

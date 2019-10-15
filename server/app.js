import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { httpsOnly } from "./helpers";
import password from "./password";
import getWords from "./words";

const app = express();

app.use(helmet());
app.use(morgan("dev"));

if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.get("/api", (_, res) => {
	getWords()
		.then((words) => words.filter((word) => word.length >= 8 && word.length <= 10))
		.then((words) => res.json({ password: password(words) }))
		.catch(() => res.sendStatus(500));
});

app.use(express.static(path.join(__dirname, "static")));

export default app;

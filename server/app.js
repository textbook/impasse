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

app.get("/api", (req, res) => {
	const { min = 8, max = 10 } = req.query;
	getWords()
		.then((words) => words.filter((word) => word.length >= min && word.length <= max))
		.then((words) => res.json({ password: password(words) }))
		.catch(() => res.sendStatus(500));
});

app.use(express.static(path.join(__dirname, "static")));

export default app;

import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { validateConfig } from "./config";
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
	const min = parseInt(req.query.min || "8", 10);
	const max = parseInt(req.query.max || "10", 10);
	const digits = parseInt(req.query.digits || "2", 10);
	const errors = validateConfig({ digits, max, min });
	if (errors) {
		return res.status(400).json({ errors });
	}
	getWords()
		.then((words) => words.filter((word) => word.length >= min && word.length <= max))
		.then((words) => res.json({ password: password(words, digits) }))
		.catch(() => res.sendStatus(500));
});

app.use(express.static(path.join(__dirname, "static")));

export default app;

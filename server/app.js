import express from "express";
import morgan from "morgan";
import path from "path";

import parseConfig from "./config";
import { configuredHelmet, httpsOnly } from "./middleware";
import password from "./password";
import getWords from "./words";

const app = express();

app.use(configuredHelmet());
app.use(morgan("dev"));

if (app.get("env") === "production") {
	app.enable("trust proxy");
	app.use(httpsOnly());
}

app.get("/api", (req, res) => {
	const [{ min, max, digits }, errors] = parseConfig(req.query);
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

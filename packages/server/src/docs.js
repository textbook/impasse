import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const {
	author: contact,
	description,
	license,
	name: title,
	version,
} = JSON.parse(await readFile(path.join(__dirname, "..", "package.json")));

const router = Router();

router.use("/", serve);

router.get("/", setup(swaggerJSDoc({
	apis: [
		path.join(__dirname, "./**/docs.yml"),
	],
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			contact,
			description,
			license: {
				name: license,
				url: "https://github.com/textbook/impasse/blob/main/LICENSE",
			},
			title,
			version,
		},
	},
})));

export default router;

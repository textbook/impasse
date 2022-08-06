import path from "node:path";

import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import {
	author as contact,
	description,
	license,
	name as title,
	version,
} from "../package.json";

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

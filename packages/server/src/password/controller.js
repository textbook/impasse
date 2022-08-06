import { Router } from "express";

import parseConfig from "./config";
import { getPassword, TooFewWords } from "./service";

const router = Router();

router.get("/", async (req, res, next) => {
	const [config, errors] = parseConfig(req.query);
	if (errors) {
		return res.status(400).json({ errors });
	}
	try {
		res.json(await getPassword(config));
	} catch (err) {
		if (err instanceof TooFewWords) {
			return res.status(400).json({ errors: [{
				description: "There are not enough words in the current configuration",
				fields: ["max", "min"],
			}] });
		}
		next(err);
	}
});

export default router;

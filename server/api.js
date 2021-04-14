import { Router } from "express";

import parseConfig from "./config";
import password from "./password";
import getWords from "./words";

const router = Router();

/**
 *
 * @openapi
 *
 * /api:
 *   get:
 *     summary: Get a moderately secure password
 *     parameters:
 *     - in: query
 *       name: digits
 *       description: |
 *         Number of digits
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 2
 *     - in: query
 *       name: max
 *       description: |
 *         Maximum word length, must be `>= min`
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 10
 *     - in: query
 *       name: min
 *       description: |
 *         Minimum word length, must be `<= max`
 *       schema:
 *         type: integer
 *         minimum: 1
 *         default: 8
 *     responses:
 *       200:
 *         description: A password was generated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *       400:
 *         description: The request was invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   minItems: 1
 *                   items:
 *                     type: object
 *                     properties:
 *                       description:
 *                         type: string
 *                       fields:
 *                         type: array
 *                         minItems: 1
 *                         items:
 *                           type: string
 *       500:
 *         description: Something went wrong on the server
 *
 */
router.get("/", (req, res) => {
	const [{ min, max, digits }, errors] = parseConfig(req.query);
	if (errors) {
		return res.status(400).json({ errors });
	}
	getWords()
		.then((words) => words.filter((word) => word.length >= min && word.length <= max))
		.then((words) => res.json({ password: password(words, digits) }))
		.catch(() => res.sendStatus(500));
});

export default router;

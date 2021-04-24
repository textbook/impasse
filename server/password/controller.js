import { Router } from "express";

import parseConfig from "./config";
import { getPassword, tooFewWords } from "./service";

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
 *                   description: the generated password
 *                   example: 'beclowned49rhizocarp%'
 *                 pwned:
 *                   type: boolean
 *                   description: whether the password appears on _"have I been pwned?"_
 *                   example: false
 *                 words:
 *                   type: number
 *                   description: the number of words available when generating the password
 *                   example: 117583
 *       400:
 *         description: The request was invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   description: a list of errors in the request
 *                   minItems: 1
 *                   items:
 *                     type: object
 *                     properties:
 *                       description:
 *                         type: string
 *                         description: a human-readable description of the error
 *                         example: Maximum length cannot be less than minimum length
 *                       fields:
 *                         type: array
 *                         description: the fields that caused the error
 *                         minItems: 1
 *                         items:
 *                           type: string
 *                         example:
 *                         - min
 *                         - max
 *       500:
 *         description: Something went wrong on the server
 *
 */
router.get("/", (req, res) => {
	const [config, errors] = parseConfig(req.query);
	if (errors) {
		return res.status(400).json({ errors });
	}
	getPassword(config)
		.then((data) => res.json(data))
		.catch((err) => {
			if (err?.message === tooFewWords) {
				return res.status(400).json({ errors: [{
					description: "There are not enough words in the current configuration",
					fields: ["max", "min"],
				}] });
			}
			res.sendStatus(500);
		});
});

export default router;

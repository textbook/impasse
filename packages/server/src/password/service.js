import { pwnedPassword } from "hibp";

import createPassword from "./password.js";
import getWords from "./words.js";

export class TooFewWords extends Error {
	constructor(count) {
		super(`only ${count} words`);
	}
}

export const getPassword = async ({ min, max, digits }) => {
	let words = await getWords();
	words = words.filter((word) => word.length >= min && word.length <= max);
	if (words.length < 2) {
		throw new TooFewWords(words.length);
	}
	const password = createPassword(words, digits);
	const count = await pwnedPassword(password);
	return { password, pwned: count > 0, words: words.length };
};

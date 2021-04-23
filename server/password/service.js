import { pwnedPassword } from "hibp";

import createPassword from "./password";
import getWords from "./words";

export const tooFewWords = "too few words available to create a password";

export const getPassword = async ({ min, max, digits }) => {
	let words = await getWords();
	words = words.filter((word) => word.length >= min && word.length <= max);
	if (words.length < 2) {
		throw new Error(tooFewWords);
	}
	const password = createPassword(words, digits);
	const count = await pwnedPassword(password);
	return { password, pwned: count > 0, words: words.length };
};

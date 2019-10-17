import { choice, randRange, sample } from "./random";

const SYMBOLS = "!@#$%^&*";

export default (words, digits = 2) => {
	const [word1, word2] = sample(words, 2);
	return `${word1}${randRange(10 ** (digits - 1), 10 ** digits)}${word2}${choice(SYMBOLS)}`;
};

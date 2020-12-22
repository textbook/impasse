import { choice, randRange, sample } from "./random";

const SYMBOLS = "!@#$%^&*";

export default (words, digits = 2) => {
	const [word1, word2] = sample(words, 2);
	const number = `${randRange(0, 10 ** digits)}`.padStart(2, "0");
	const symbol = choice(SYMBOLS);
	return `${word1}${number}${word2}${symbol}`;
};

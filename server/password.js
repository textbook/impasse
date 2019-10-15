import { choice, randRange, sample } from "./random";

const SYMBOLS = "!@#$%^&*";

export default (words) => {
	const [word1, word2] = sample(words, 2);
	return `${word1}${randRange(10, 100)}${word2}${choice(SYMBOLS)}`;
};

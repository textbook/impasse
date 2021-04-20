import password from "./password";
import getWords from "./words";

export const getPassword = ({ min, max, digits }) => getWords()
	.then((words) => words.filter((word) => word.length >= min && word.length <= max))
	.then((words) => password(words, digits));

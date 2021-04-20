import { pwnedPassword } from "hibp";

import createPassword from "./password";
import getWords from "./words";

export const getPassword = ({ min, max, digits }) => getWords()
	.then((words) => words.filter((word) => word.length >= min && word.length <= max))
	.then((words) => createPassword(words, digits))
	.then((password) => pwnedPassword(password).then((count) => ({ password, pwned: count > 0 })));

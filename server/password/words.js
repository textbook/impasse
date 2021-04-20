import { readFile } from "fs";
import { promisify } from "util";
import location from "word-list";

let wordPromise;

export default () => {
	if (!wordPromise) {
		wordPromise = promisify(readFile)(location, { encoding: "utf8" }).then((text) => text.split("\n"));
	}
	return wordPromise;
};

export const choice = (options) => options[(randRange(0, options.length))];

export const randRange = (start, end) => Math.floor((Math.random() * (end - start)) + start);

export const sample = (options, count) => {
	if (options.length < count) {
		throw new Error(`too few options (needed ${count}, got ${options.length})`);
	}
	// TODO: this isn't very efficient, and may run forever
	const indices = new Set();
	while (indices.size < count) {
		indices.add(randRange(0, options.length));
	}
	return options.filter((_, index) => indices.has(index));
};

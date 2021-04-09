/* eslint-disable no-console */

import "@testing-library/jest-dom/extend-expect";

const originalError = console.error;

console.error = (message, ...args) => {
	if (message.startsWith("Warning: Can't perform a React state update on an unmounted component.")) {
		// https://github.com/facebook/jest/issues/2129#issuecomment-482255534
		expect.assertions(Infinity);
	}
	originalError(message, ...args);
};

/* eslint-disable no-console */

import "@testing-library/jest-dom";

const originalError = console.error;

console.error = (message, ...args) => {
	if (
		message.startsWith("Warning: Can't perform a React state update on an unmounted component.")
		|| message.startsWith("Warning: Failed prop type:")
		|| message.startsWith("Warning: A component is changing a controlled input to be uncontrolled.")
	) {
		// https://github.com/facebook/jest/issues/2129#issuecomment-482255534
		expect.assertions(Infinity);
	}
	originalError(message, ...args);
};

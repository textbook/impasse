/* eslint-disable no-console */

import { configure } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

configure({ testIdAttribute: "data-qa" });

global.defer = () => {
	const deferred = {};
	deferred.promise = new Promise((resolve, reject) => {
		deferred.resolve = resolve;
		deferred.reject = reject;
	});
	return deferred;
};

global.tick = () => new Promise((resolve) => setTimeout(resolve));

const originalError = console.error;

console.error = (message, ...args) => {
	if (message.startsWith("Warning: Can't perform a React state update on an unmounted component.")) {
		// https://github.com/facebook/jest/issues/2129#issuecomment-482255534
		expect.assertions(Infinity);
	}
	originalError(message, ...args);
};

import { configure } from "@testing-library/react";
import "@testing-library/react/cleanup-after-each";
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

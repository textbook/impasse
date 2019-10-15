import React from "react";
import { render } from "@testing-library/react";

import { App } from "./App";
import { getPassword } from "./service";

jest.mock("./service");

describe("App", () => {
	let deferred;
	let wrapper;

	const message = "Foo bar!";

	beforeEach(() => {
		deferred = defer();
		getPassword.mockReturnValue(deferred.promise);
		wrapper = render(<App />);
	});

	it("requests the password", () => {
		expect(getPassword).toHaveBeenCalled();
	});

	it("displays a title", async () => {
		let element = wrapper.getByTestId("title");
		expect(element).toHaveTextContent("Impasse");
	});

	it("shows a loading state", async () => {
		expect(wrapper.getByTestId("password")).toHaveTextContent("Loading...");
	});

	describe("when request resolves", () => {
		beforeEach(async () => {
			deferred.resolve(message);
			await tick();
		});

		it("displays password", async () => {
			expect(wrapper.getByTestId("password")).toHaveTextContent(message);
		});
	});
});

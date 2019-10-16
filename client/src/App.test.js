import React from "react";
import { fireEvent, render, waitForElementToBeRemoved } from "@testing-library/react";

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

		it("returns to the loading state when the config changes", () => {
			fireEvent.change(wrapper.getByTestId("minLength"), { target: { value: 7 } });
			expect(wrapper.getByTestId("password")).toHaveTextContent("Loading...");
		});
	});

	describe("when request rejects", () => {
		beforeEach(async () => {
			deferred.reject(message);
			await tick();
		});

		it("displays the error message", () => {
			expect(wrapper.getByTestId("password")).toHaveTextContent("No password available");
			expect(wrapper.getByTestId("error")).toHaveTextContent(message);
		});

		it("clears the error message when successful", async () => {
			const newPassword = "yay!";
			getPassword.mockResolvedValue(newPassword);
			fireEvent.click(wrapper.getByTestId("refresh"));
			await waitForElementToBeRemoved(() => wrapper.getByTestId("error"));
			expect(wrapper.getByTestId("password")).toHaveTextContent(newPassword);
		});
	});

	it("makes a request in response to refresh request", () => {
		getPassword.mockClear();
		fireEvent.click(wrapper.getByTestId("refresh"));
		expect(getPassword).toHaveBeenCalledWith({ min: 8, max: 10 });
	});

	describe("configuration", () => {
		it("renders Config", () => {
			expect(wrapper.getByTestId("minLength")).toHaveValue(8);
			expect(wrapper.getByTestId("maxLength")).toHaveValue(10);
		});

		it("updates in response to config changes", () => {
			fireEvent.change(wrapper.getByTestId("minLength"), { target: { value: 7 } });
			expect(wrapper.getByTestId("minLength")).toHaveValue(7);
		});

		it("makes a request in response to config changes", () => {
			fireEvent.change(wrapper.getByTestId("minLength"), { target: { value: 7 } });
			expect(getPassword).toHaveBeenCalledWith({ min: 7, max: 10 });
		});
	});
});

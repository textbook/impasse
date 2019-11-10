import React from "react";
import { act, fireEvent, render } from "@testing-library/react";

import { App } from "./App";
import { getPassword } from "./services/passwordService";

jest.mock("./services/passwordService");

describe("App", () => {
	let deferred;
	let wrapper;

	const message = "Foo bar!";

	beforeEach(async () => {
		deferred = defer();
		getPassword.mockReturnValue(deferred.promise);
		wrapper = render(<App />);
		await tick();
	});

	it("requests the password", () => {
		expect(getPassword).toHaveBeenCalled();
	});

	it("displays a title", () => {
		let element = wrapper.getByTestId("title");
		expect(element).toHaveTextContent("Impasse");
	});

	it("shows a loading state", () => {
		expect(wrapper.getByTestId("password-wrapper")).toHaveClass("is-loading");
	});

	it("makes a request in response to refresh request", () => {
		getPassword.mockClear();
		fireEvent.click(wrapper.getByTestId("refresh"));
		expect(getPassword).toHaveBeenCalledWith({ digits: 2, min: 8, max: 10 });
	});

	it("cleans up on unmount", async () => {
		wrapper.unmount();
		deferred.resolve(message);
		await tick();
	});

	describe("when request resolves", () => {
		beforeEach(async () => {
			await act(async () => {
				deferred.resolve(message);
			});
			await tick();
		});

		it("displays password", () => {
			expect(wrapper.getByTestId("password")).toHaveValue(message);
		});

		it("returns to the loading state when the config changes", async () => {
			getPassword.mockReturnValue(defer().promise);
			fireEvent.change(wrapper.getByTestId("minLength"), { target: { value: 7 } });
			await tick();
			expect(wrapper.getByTestId("password-wrapper")).toHaveClass("is-loading");
		});
	});

	describe("when request rejects", () => {
		beforeEach(async () => {
			await act(async () => {
				deferred.reject({
					descriptions: [message, "also broken"],
					fields: ["min", "max"],
				});
			});
			await tick();
		});

		it("displays the error message", () => {
			expect(wrapper.getByTestId("password")).toHaveAttribute("placeholder", "No password available");
			expect(wrapper.getByTestId("error")).toHaveTextContent(message);
		});

		it("sets error states", () => {
			expect(wrapper.getByLabelText("Minimum word length")).toHaveClass("is-danger");
			expect(wrapper.getByLabelText("Maximum word length")).toHaveClass("is-danger");
			expect(wrapper.getByLabelText("Number of digits")).not.toHaveClass("is-danger");
		});

		it("clears the error message when successful", async () => {
			const newPassword = "yay!";
			getPassword.mockResolvedValue(newPassword);
			await act(async () => {
				await fireEvent.click(wrapper.getByTestId("refresh"));
			});
			expect(wrapper.getByTestId("password")).toHaveValue(newPassword);
		});
	});

	describe("configuration", () => {
		it("renders Config", () => {
			expect(wrapper.getByTestId("digits")).toHaveValue(2);
			expect(wrapper.getByTestId("minLength")).toHaveValue(8);
			expect(wrapper.getByTestId("maxLength")).toHaveValue(10);
		});

		it("updates in response to config changes", () => {
			fireEvent.change(wrapper.getByTestId("minLength"), { target: { value: 7 } });
			expect(wrapper.getByTestId("minLength")).toHaveValue(7);
		});

		it("makes a request in response to config changes", () => {
			fireEvent.change(wrapper.getByTestId("minLength"), { target: { value: 7 } });
			expect(getPassword).toHaveBeenCalledWith({ digits: 2, min: 7, max: 10 });
		});
	});
});

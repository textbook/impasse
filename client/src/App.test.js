import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { App } from "./App";
import { getPassword } from "./services/passwordService";

jest.mock("./services/passwordService");

const UNRESOLVED = new Promise(() => {});

describe("App", () => {
	const message = "Foo bar!";

	it("requests the password", () => {
		getPassword.mockReturnValue(UNRESOLVED);
		render(<App />);

		expect(getPassword).toHaveBeenCalled();
	});

	it("displays a title", () => {
		getPassword.mockReturnValue(UNRESOLVED);
		render(<App />);

		expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Impasse");
	});

	it("shows a loading state", () => {
		getPassword.mockReturnValue(UNRESOLVED);
		render(<App />);

		expect(screen.getByTestId("password-wrapper")).toHaveClass("is-loading");
	});

	it("cleans up on unmount", async () => {
		getPassword.mockResolvedValue({ password: "too late!" });
		const { unmount } = render(<App />);
		unmount();
	});

	describe("when request resolves with clean password", () => {
		beforeEach(async () => {
			getPassword.mockResolvedValue({ password: message });
			render(<App />);
			await waitFor(() => {
				// eslint-disable-next-line jest/no-standalone-expect
				expect(screen.getByTestId("password-wrapper")).not.toHaveClass("is-loading");
			});
		});

		it("displays password", async () => {
			expect(passwordInput()).toHaveValue(message);
		});

		it("doesn't display a warning", () => {
			expect(screen.queryByText("This password has been pwned.")).not.toBeInTheDocument();
		});

		it("makes a request in response to refresh request", async () => {
			getPassword.mockClear();
			getPassword.mockReturnValue(UNRESOLVED);

			userEvent.click(refreshButton());

			expect(getPassword).toHaveBeenCalledWith({ digits: 2, min: 8, max: 10 });
		});

		it("returns to the loading state when the config changes", async () => {
			getPassword.mockReturnValue(UNRESOLVED);

			userEvent.type(minLengthInput(), "7");

			expect(screen.getByTestId("password-wrapper")).toHaveClass("is-loading");
		});
	});

	describe("when request resolves with pwned password", () => {
		it("warns the user", async () => {
			getPassword.mockResolvedValue({ password: message, pwned: true });
			render(<App />);
			await waitFor(() => {
				// eslint-disable-next-line jest/no-standalone-expect
				expect(screen.getByTestId("password-wrapper")).not.toHaveClass("is-loading");
			});

			expect(screen.getByText("This password has been pwned.")).toBeInTheDocument();
		});
	});

	describe("when request rejects", () => {
		const error = {
			descriptions: ["bad news", "also broken"],
			fields: ["min", "max"],
		};

		beforeEach(async () => {
			getPassword.mockRejectedValue(error);
			render(<App />);
			await waitFor(() => {
				// eslint-disable-next-line jest/no-standalone-expect
				expect(screen.getByTestId("password-wrapper")).not.toHaveClass("is-loading");
			});
		});

		it("displays the error messages", async () => {
			expect(passwordInput()).toHaveAttribute("placeholder", "No password available");
			error.descriptions.forEach((errorMessage) => {
				expect(screen.queryByText(errorMessage)).toBeInTheDocument();
			});
		});

		it("sets error states", async () => {
			expect(minLengthInput()).toHaveClass("is-danger");
			expect(maxLengthInput()).toHaveClass("is-danger");
			expect(digitsInput()).not.toHaveClass("is-danger");
		});

		it("clears the error message when successful", async () => {
			const newPassword = "yay!";
			getPassword.mockResolvedValue({ password: newPassword });

			userEvent.click(refreshButton());

			await waitFor(() => {
				expect(passwordInput()).toHaveValue(newPassword);
			});
		});
	});

	describe("configuration", () => {
		it("renders Config", () => {
			getPassword.mockReturnValue(UNRESOLVED);
			render(<App />);

			expect(digitsInput()).toHaveValue(2);
			expect(minLengthInput()).toHaveValue(8);
			expect(maxLengthInput()).toHaveValue(10);
		});

		it("updates in response to config changes", () => {
			getPassword.mockReturnValue(UNRESOLVED);
			render(<App />);

			userEvent.type(minLengthInput(), "1");

			expect(minLengthInput()).toHaveValue(81);
		});

		it("makes a request in response to config changes", () => {
			getPassword.mockReturnValue(UNRESOLVED);
			render(<App />);
			getPassword.mockClear();

			userEvent.type(digitsInput(), "1");

			expect(getPassword).toHaveBeenCalledWith({ digits: 21, min: 8, max: 10 });
		});
	});

	const digitsInput = () => screen.getByRole("spinbutton", { name: "Number of digits" });
	const maxLengthInput = () => screen.getByRole("spinbutton", { name: "Maximum word length" });
	const minLengthInput = () => screen.getByRole("spinbutton", { name: "Minimum word length" });
	const passwordInput = () => screen.getByRole("textbox", { name: "Password" });
	const refreshButton = () => screen.getByRole("button", { name: "Refresh" });
});

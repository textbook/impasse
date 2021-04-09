import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Config } from "./Config";

describe("Config component", () => {
	const config = { digits: 2, min: 8, max: 10 };

	it("displays the current config", () => {
		render(<Config config={config} onChange={() => {}} />);

		expect(maxLengthInput()).toHaveValue(config.max);
		expect(minLengthInput()).toHaveValue(config.min);
		expect(digitsInput()).toHaveValue(config.digits);
	});

	it("emits updated config on minLength change", () => {
		const callback = jest.fn();
		render(<Config config={config} onChange={callback} />);

		userEvent.clear(minLengthInput());
		userEvent.type(minLengthInput(), "7");

		expect(callback).toHaveBeenCalledWith({ ...config, min: 7 });
	});

	it("emits updated config on maxLength change", () => {
		const callback = jest.fn();
		render(<Config config={config} onChange={callback} />);

		userEvent.clear(maxLengthInput());
		userEvent.type(maxLengthInput(), "11");

		expect(callback).toHaveBeenCalledWith({ ...config, max: 11 });
	});

	it("emits updated config on digits change", () => {
		const callback = jest.fn();
		render(<Config config={config} onChange={callback} />);

		userEvent.clear(digitsInput());
		userEvent.type(digitsInput(), "11");

		expect(callback).toHaveBeenCalledWith({ ...config, digits: 11 });
	});

	const digitsInput = () => screen.getByRole("spinbutton", { name: "Number of digits" });
	const maxLengthInput = () => screen.getByRole("spinbutton", { name: "Maximum word length" });
	const minLengthInput = () => screen.getByRole("spinbutton", { name: "Minimum word length" });
});

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

	it("emits updated config on minLength change", async () => {
		const callback = jest.fn();
		render(<Config config={config} onChange={callback} />);

		await userEvent.clear(minLengthInput());
		await userEvent.type(minLengthInput(), "1");

		expect(callback).toHaveBeenCalledWith({ ...config, min: 81 });
	});

	it("emits updated config on maxLength change", async () => {
		const callback = jest.fn();
		render(<Config config={config} onChange={callback} />);

		await userEvent.clear(maxLengthInput());
		await userEvent.type(maxLengthInput(), "2");

		expect(callback).toHaveBeenCalledWith({ ...config, max: 102 });
	});

	it("emits updated config on digits change", async () => {
		const callback = jest.fn();
		render(<Config config={config} onChange={callback} />);

		await userEvent.clear(digitsInput());
		await userEvent.type(digitsInput(), "3");

		expect(callback).toHaveBeenCalledWith({ ...config, digits: 23 });
	});

	const digitsInput = () => screen.getByRole("spinbutton", { name: "Number of digits" });
	const maxLengthInput = () => screen.getByRole("spinbutton", { name: "Maximum word length" });
	const minLengthInput = () => screen.getByRole("spinbutton", { name: "Minimum word length" });
});

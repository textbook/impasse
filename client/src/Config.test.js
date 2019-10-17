import React from "react";
import { fireEvent, render } from "@testing-library/react";

import { Config } from "./Config";

describe("Config component", () => {
	const config = { digits: 2, min: 8, max: 10 };

	let callback;
	let wrapper;

	beforeEach(() => {
		callback = jest.fn();
		wrapper = render(<Config config={config} onChange={callback} />);
	});

	it("displays the current config", () => {
		expect(wrapper.getByTestId("maxLength")).toHaveValue(config.max);
		expect(wrapper.getByTestId("minLength")).toHaveValue(config.min);
		expect(wrapper.getByTestId("digits")).toHaveValue(config.digits);
	});

	it("emits updated config on minLength change", () => {
		fireEvent.change(wrapper.getByTestId("minLength"),  { target: { value: 7 } });
		expect(callback).toHaveBeenCalledWith({ ...config, min: 7 });
	});

	it("emits updated config on maxLength change", () => {
		fireEvent.change(wrapper.getByTestId("maxLength"),  { target: { value: 11 } });
		expect(callback).toHaveBeenCalledWith({ ...config, max: 11 });
	});

	it("emits updated config on digits change", () => {
		fireEvent.change(wrapper.getByTestId("digits"),  { target: { value: 11 } });
		expect(callback).toHaveBeenCalledWith({ ...config, digits: 11 });
	});
});

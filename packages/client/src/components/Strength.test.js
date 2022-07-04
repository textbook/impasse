import { render } from "@testing-library/react";

import Strength from "./Strength";

describe("Strength component", () => {
	it("shows the naive strength", () => {
		const { container } = render(<Strength config={{ digits: 3, max: 5, min: 4 }} words={0} />);

		expect(container).toHaveTextContent("between 65.51 and 76.43");
		expect(container).toHaveTextContent("between 12 and 14 characters");
	});

	it("shows the actual strength", () => {
		const { container } = render(<Strength config={{ digits: 3, max: 0, min: 0 }} words={12} />);

		expect(container.firstChild).toHaveTextContent("20.01 (equivalent to 4 characters)");
	});

	it("handles the singular case correctly", () => {
		const { container } = render(<Strength config={{ digits: 1, max: 1, min: 1 }} words={2} />);

		expect(container.firstChild).toHaveTextContent("7.32 (equivalent to 1 character)");
	});

	it("handles equal min and max correctly", () => {
		const { container } = render(<Strength config={{ digits: 3, max: 4, min: 4 }} words={0} />);

		expect(container.firstChild).toHaveTextContent("65.51");
		expect(container).toHaveTextContent("12 characters");
		expect(container.firstChild).not.toHaveTextContent("between");
	});
});

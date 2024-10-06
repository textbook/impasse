import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

vi.mock("../../../../package.json", () => ({ default: {
	author: {
		name: "Jane Doe",
		email: "jane.doe@morgue.org",
		url: "https://morgue.org",
	},
	version: "1.2.3",
} }));

describe("Footer component", () => {
	it("renders author information", () => {
		render(<Footer />);
		expect(screen.getByText("Jane Doe")).toHaveAttribute("href", "https://morgue.org");
	});

	it("renders version information", () => {
		render(<Footer />);
		expect(screen.queryByText("Version 1.2.3")).toBeInTheDocument();
	});
});

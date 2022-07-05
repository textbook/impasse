import { render, screen } from "@testing-library/react";

import Pwned from "./Pwned";

describe("Pwned component", () => {
	it("gives a link to HIBP?", () => {
		render(<Pwned />);
		expect(screen.getByRole("link", { name: /have i been pwned?/i }))
			.toHaveAttribute("href", "https://haveibeenpwned.com/");
	});
});

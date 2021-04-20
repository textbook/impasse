it("shows when a password has been pwned", () => {
	const password = "password123";
	cy.intercept("/api", { password, pwned: true });
	cy.visit("/");

	cy.findByRole("textbox", { name: "Password" }).should("have.value", password);
	cy.findByText("This password has been pwned.").should("exist");
});

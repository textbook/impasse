beforeEach(() => {
	cy.visit("/");
});

it("displays the site", () => {
	cy.getDataQa("title").should("contain.text", "Impasse");
});

it("meets basic accessibility guidelines", () => {
	cy.injectAxe();
	cy.checkA11y();
});

it("displays a password", () => {
	const password = /[a-z]{8,10}\d{2}[a-z]{8,10}[!@#$%^&*]/;
	cy.getDataQa("password").invoke("text").should("match", password);
});

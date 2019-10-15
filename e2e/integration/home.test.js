beforeEach(() => {
	cy.visit("/");
});

it("displays the site", () => {
	cy.get("[data-qa=\"title\"]").should("contain.text", "Impasse");
});

it("meets basic accessibility guidelines", () => {
	cy.injectAxe();
	cy.checkA11y();
});

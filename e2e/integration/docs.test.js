it("displays API documentation", () => {
	cy.visit("/docs");

	cy.findByText("GET").should("exist");
	cy.findByText("Get a moderately secure password").should("exist");

	cy.findByText("GET").click();
	cy.findByText("A password was generated").should("exist");
	cy.findByText("The request was invalid").should("exist");
	cy.findByText("Something went wrong on the server").should("exist");
});

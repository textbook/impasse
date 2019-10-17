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
	cy.getDataQa("password").invoke("text").should("match", regex());
});

it("allows the password to be refreshed", () => {
	cy.getDataQa("password").invoke("text").should("match", regex()).then((oldText) => {
		cy.getDataQa("refresh").click();
		cy.getDataQa("password").should("not.contain.text", oldText);
	});
});

it("allows the password to be configured", () => {
	cy.getDataQa("minLength").clear().type(7);
	cy.getDataQa("maxLength").clear().type(7);
	cy.getDataQa("digits").clear().type(3);

	cy.getDataQa("password").invoke("text").should("match", regex({ minLength: 7, maxLength: 7, digits: 3 }));
});

it("validates the word length input", () => {
	cy.getDataQa("minLength").clear().type(10);
	cy.getDataQa("maxLength").clear().type(8);

	cy.getDataQa("password").should("contain.text", "No password available");
	cy.getDataQa("error").should("contain.text", "Maximum length cannot be less than minimum length");
});

it("validates the digits input", () => {
	cy.getDataQa("digits").clear().type(-2);

	cy.getDataQa("password").should("contain.text", "No password available");
	cy.getDataQa("error").should("contain.text", "Number of digits must be positive");
});

const regex = ({ minLength = 8, maxLength = 10, digits = 2 } = {}) =>
	new RegExp(`[a-z]{${minLength},${maxLength}}\\d{${digits}}[a-z]{${minLength},${maxLength}}[!@#$%^&*]`);

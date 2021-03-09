beforeEach(() => {
	cy.visit("/");
});

it("displays the site", () => {
	cy.findByTestId("title").should("contain.text", "Impasse");
});

it("meets basic accessibility guidelines", () => {
	cy.injectAxe();
	cy.checkA11y();
});

it("displays a password", () => {
	cy.findByTestId("password").invoke("val").should("match", regex());
});

it("allows the password to be refreshed", () => {
	cy.findByTestId("password").invoke("val").should("match", regex()).then((oldText) => {
		cy.findByTestId("refresh").click();
		cy.findByTestId("password").should("not.have.value", oldText);
	});
});

it("allows the password to be configured", () => {
	cy.findByTestId("minLength").clear().type(7);
	cy.findByTestId("maxLength").clear().type(7);
	cy.findByTestId("digits").clear().type(3);

	cy.findByTestId("password").invoke("val").should("match", regex({ minLength: 7, maxLength: 7, digits: 3 }));
});

it("validates the word length input", () => {
	cy.findByTestId("minLength").clear().type(10);
	cy.findByTestId("maxLength").clear().type(8);

	cy.findByTestId("password").should("have.attr", "placeholder", "No password available");
	cy.findByTestId("error").should("contain.text", "Maximum length cannot be less than minimum length");
});

it("validates the digits input", () => {
	cy.findByTestId("digits").clear().type(0);

	cy.findByTestId("password").should("have.attr", "placeholder", "No password available");
	cy.findByTestId("error").should("contain.text", "Number of digits must be positive");
});

const regex = ({ minLength = 8, maxLength = 10, digits = 2 } = {}) =>
	new RegExp(`[a-z]{${minLength},${maxLength}}\\d{${digits}}[a-z]{${minLength},${maxLength}}[!@#$%^&*]`);

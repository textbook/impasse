beforeEach(() => {
	cy.visit("/");
});

it("displays the site", () => {
	cy.findByRole("heading", { level: 1 }).should("contain.text", "Impasse");
	cy.findByRole("heading", { level: 2 }).should("contain.text", "Generate moderately secure passwords");
});

it("meets basic accessibility guidelines", () => {
	cy.injectAxe();
	cy.checkA11y();
});

it("displays a password", () => {
	cy.findByRole("textbox", { name: "Password" }).invoke("val").should("match", regex());
});

it("allows the password to be refreshed", () => {
	cy.findByRole("textbox", { name: "Password" }).invoke("val").should("match", regex()).then((oldText) => {
		cy.findByRole("button", { name: "Refresh" }).click();
		cy.findByRole("textbox", { name: "Password" }).should("not.have.value", oldText);
	});
});

it("allows the password to be configured", () => {
	cy.findByRole("spinbutton", { name: "Minimum word length" }).clear().type(7);
	cy.findByRole("spinbutton", { name: "Maximum word length" }).clear().type(7);
	cy.findByRole("spinbutton", { name: "Number of digits" }).clear().type(3);

	cy.findByRole("textbox", { name: "Password" }).invoke("val").should("match", regex({ minLength: 7, maxLength: 7, digits: 3 }));
});

it("validates the word length input", () => {
	cy.findByRole("spinbutton", { name: "Minimum word length" }).clear().type(10);
	cy.findByRole("spinbutton", { name: "Maximum word length" }).clear().type(8);

	cy.findByRole("textbox", { name: "Password" }).should("have.attr", "placeholder", "No password available");
	cy.findByText("Maximum length cannot be less than minimum length").should("exist");
});

it("validates the digits input", () => {
	cy.findByRole("spinbutton", { name: "Number of digits" }).clear().type(0);

	cy.findByRole("textbox", { name: "Password" }).should("have.attr", "placeholder", "No password available");
	cy.findByText("Number of digits must be positive").should("exist");
});

it("shows a useful error when there are too few words", () => {
	cy.findByRole("spinbutton", { name: "Minimum word length" }).clear().type(30);
	cy.findByRole("spinbutton", { name: "Maximum word length" }).clear().type(30);

	cy.findByRole("textbox", { name: "Password" }).should("have.attr", "placeholder", "No password available");
	cy.findByText("There are not enough words in the current configuration").should("exist");
});

const regex = ({ minLength = 8, maxLength = 10, digits = 2 } = {}) =>
	new RegExp(`[a-z]{${minLength},${maxLength}}\\d{${digits}}[a-z]{${minLength},${maxLength}}[!@#$%^&*]`);

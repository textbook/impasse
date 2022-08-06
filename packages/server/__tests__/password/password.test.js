import password from "../../src/password/password";

describe("password", () => {
	const words = ["alphabet", "barbaric", "catamaran"];

	it("returns a password", () => {
		expect(password(words)).toMatch(/[a-z]{8,10}\d{2}[a-z]{8,10}[!@#$%^&*]/);
	});

	it("provides the requested number of digits", () => {
		expect(password(words, 4)).toMatch(/[a-z]{8,10}\d{4}[a-z]{8,10}[!@#$%^&*]/);
	});

	it("doesn't repeat words", () => {
		const result = password(["meanings", "universe"]);
		expect(result).toContain("meanings");
		expect(result).toContain("universe");
	});

	it("fails loudly when not enough words", () => {
		expect(() => password(["one"])).toThrow(/^too few options/);
	});
});

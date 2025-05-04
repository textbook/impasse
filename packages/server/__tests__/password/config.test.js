import parseConfig from "../../src/password/config";

describe("parseConfig", () => {
	it("returns null errors for valid config", () => {
		const [, errors] = parseConfig({ min: "1", max: "2", digits: "3" });
		expect(errors).toBeNull();
	});

	it("parses the numerical values", () => {
		const [config] = parseConfig({ min: "1", max: "2", digits: "3" });
		expect(config).toEqual({ min: 1, max: 2, digits: 3 });
	});

	it("provides sensible defaults for missing params", () => {
		const [config] = parseConfig({});
		expect(config).toEqual({ min: 8, max: 10, digits: 2 });
	});

	[
		{
			description: "requires a positive digit field",
			input: { min: "1", max: "2", digits: "-1" },
			expected: [
				{ description: "Number of digits must be positive", fields: ["digits"] },
			],
		},
		{
			description: "requires maximum length to exceed minimum length",
			input: { min: "2", max: "1", digits: "3" },
			expected: [
				{ description: "Maximum length cannot be less than minimum length", fields: ["max", "min"] },
			],
		},
		{
			description: "requires a positive minimum length field",
			input: { min: "-1", max: "2", digits: "3" },
			expected: [
				{ description: "Minimum length must be positive", fields: ["min"] },
			],
		},
		{
			description: "requires a positive maximum length field",
			input: { min: "1", max: "-2", digits: "3" },
			expected: [
				{ description: "Maximum length cannot be less than minimum length", fields: ["max", "min"] },
				{ description: "Maximum length must be positive", fields: ["max"] },
			],
		},
		{
			description: "requires numbers for all fields",
			input: { min: "foo", max: "bar", digits: "baz" },
			expected: [
				{ description: "Maximum length must be a number", fields: ["max"] },
				{ description: "Minimum length must be a number", fields: ["min"] },
				{ description: "Number of digits must be a number", fields: ["digits"] },
			],
		},
		{
			description: "handles a combination of mistakes",
			input: { min: "5", max: "qux", digits: "-2" },
			expected: [
				{ description: "Maximum length must be a number", fields: ["max"] },
				{ description: "Number of digits must be positive", fields: ["digits"] },
			],
		},
	].forEach(({ description, input, expected }) => {
		it(`${description}`, () => {
			let [, errors] = parseConfig(input);
			expected.forEach((error) => {
				expect(errors).toContainEqual(error);
			});
		});
	});
});

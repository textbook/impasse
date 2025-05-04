import { jest } from "@jest/globals";

jest.unstable_mockModule("../../src/password/random", () => ({
	choice: jest.fn(),
	randRange: jest.fn(),
	sample: jest.fn(),
}));

const { default: password } = await import("../../src/password/password");
const { choice, randRange, sample } = await import("../../src/password/random");

describe("password", () => {
	it("pads the number with zeroes", () => {
		const words = ["alphabet", "barbaric"];
		choice.mockReturnValue("!");
		randRange.mockReturnValue(1);
		sample.mockReturnValue(words);

		const actual = password(words);

		expect(actual).toBe("alphabet01barbaric!");
		expect(choice).toHaveBeenCalledWith("!@#$%^&*");
		expect(randRange).toHaveBeenCalledWith(0, 100);
		expect(sample).toHaveBeenCalledWith(words, 2);
	});

	it("pads the non-default length number with zeroes", () => {
		const words = ["cabaret", "dinosaur"];
		choice.mockReturnValue("!");
		randRange.mockReturnValue(1);
		sample.mockReturnValue(words);

		const actual = password(words, 3);

		expect(actual).toBe("cabaret001dinosaur!");
	});
});

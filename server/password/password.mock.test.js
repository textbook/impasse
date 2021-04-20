import password from "./password";
import { randRange, sample, choice } from "./random";

jest.mock("./random");

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
		const words = ["alphabet", "barbaric"];
		choice.mockReturnValue("!");
		randRange.mockReturnValue(1);
		sample.mockReturnValue(words);

		const actual = password(words, 3);

		expect(actual).toBe("alphabet001barbaric!");
	});
});

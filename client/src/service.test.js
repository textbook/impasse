import { get } from "./client";
import { getMessage } from "./service";

jest.mock("./client");

describe("service", () => {
	describe("getMessage", ()  => {
		const message = "Take me to your leader";

		beforeEach(() => {
			get.mockResolvedValue({ message });
		});

		it("makes a request", async () => {
			await getMessage();

			expect(get).toHaveBeenCalledWith("/api");
		});

		it("exposes the data", async () => {
			await expect(getMessage()).resolves.toEqual(message);
		});
	});
});
